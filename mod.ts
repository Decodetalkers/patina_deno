/*!
 * Patina.ts
 * @itorr <https://lab.magiconch.com/>
 * 2022-03-31
 */

import {
  Convolutes,
  fontStringLists,
  type PatinaConfig,
  type Plain,
} from "./config.ts";

export type { ConvoluteKey, Convolutes, PatinaConfig } from "./config.ts";

// Utility functions
//
const clamp = (x: number): number => (x >= 0 ? (x <= 255 ? x : 255) : 0);
const clampuv = (
  x: number,
): number => (x >= -128 ? (x <= 127 ? x : 127) : -128);

const rgb2yuv = (r: number, g: number, b: number): [number, number, number] => {
  const y = Math.floor(r * 0.299 + g * 0.587 + b * 0.114);
  const u = Math.floor(r * -0.168736 + g * -0.331264 + b * 0.5 + 128);
  const v = Math.floor(r * 0.5 + g * -0.418688 + b * -0.081312 + 128);
  return [y, u, v];
};

const yuv2rgb = (y: number, u: number, v: number) => {
  let r, g, b;

  r = y + 1.4075 * (v - 128);
  g = y - 0.3455 * (u - 128) - (0.7169 * (v - 128));
  b = y + 1.7790 * (u - 128);

  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);

  r = (r < 0) ? 0 : r;
  r = (r > 255) ? 255 : r;

  g = (g < 0) ? 0 : g;
  g = (g > 255) ? 255 : g;

  b = (b < 0) ? 0 : b;
  b = (b > 255) ? 255 : b;

  return [r, g, b];
};

const convolute = (pixels: ImageData, weights: number[]): ImageData => {
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);

  const src = pixels.data;
  const sw = pixels.width;
  const sh = pixels.height;

  const output = new ImageData(sw, sh);
  const dst = output.data;

  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      let r = 0, g = 0, b = 0;
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = Math.min(sh - 1, Math.max(0, y + cy - halfSide));
          const scx = Math.min(sw - 1, Math.max(0, x + cx - halfSide));
          const srcOff = (scy * sw + scx) * 4;
          const wt = weights[cy * side + cx];
          r += src[srcOff] * wt;
          g += src[srcOff + 1] * wt;
          b += src[srcOff + 2] * wt;
        }
      }
      const dstOff = (y * sw + x) * 4;
      dst[dstOff] = r;
      dst[dstOff + 1] = g;
      dst[dstOff + 2] = b;
      dst[dstOff + 3] = 255;
    }
  }

  return output;
};

function roundTime(config: PatinaConfig): number {
  if (config.usePop) {
    return Math.pow(config.popDim, 2);
  }
  return config.greenTimes;
}

type Size = {
  width: number;
  height: number;
};

const randRangeGlobal = (a: number, b: number) =>
  Math.round(Math.random() * (b - a) + a);

function deepinCopy<T>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}

export class PantaData {
  private img: HTMLImageElement;
  private imgOutput: HTMLImageElement;
  private imgOutputPop: HTMLImageElement;
  private running: boolean = false;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private popCanvas: HTMLCanvasElement;
  private popCtx: CanvasRenderingContext2D;
  private config: PatinaConfig;

  private _previewWidth?: number;

  private currentTime: number = 0;

  private randRange = (a: number, b: number): number =>
    Math.round(Math.random() * (b - a) + a);
  private randName = (userNames: string[]): string => {
    const k = "-_+~!^&、.。”“\"'|"[this.randRange(0, 14)];
    return userNames[this.randRange(0, userNames.length - 1)].replace(
      /\d\d\d\d/,
      () => this.randRange(0, 9999).toString(),
    ).replace(/_/g, () => k);
  };
  constructor(config?: PatinaConfig, img?: HTMLImageElement) {
    this.config = config || defaultConfig;
    this.img = img || new Image();
    this.imgOutput = new Image();
    this.imgOutputPop = new Image();
    this.canvas = document.createElement("canvas");
    this.popCanvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.popCtx = this.popCanvas.getContext("2d")!;
    this._previewWidth = this.config.previewWidth;
  }

  get isRunning(): boolean {
    return this.running;
  }

  get previewWidth(): number {
    return this._previewWidth || this.srcWidth;
  }

  get isPop(): boolean {
    return this.getConfigKey("usePop");
  }

  get useWaterMark(): boolean {
    return this.getConfigKey("watermark");
  }

  get isGreen(): boolean {
    return this.getConfigKey("isGreen");
  }

  get popDim(): number {
    return this.getConfigKey("popDim");
  }

  get quality(): number {
    return this.getConfigKey("quality");
  }

  get greenTimes(): number {
    return this.getConfigKey("greenTimes");
  }

  get userNames(): string[] {
    return this.getConfigKey("userNames");
  }
  get randEnabled(): boolean {
    return this.getConfigKey("rand");
  }
  async setIsRand(rand: boolean) {
    await this.setConfigKey("rand", rand);
  }
  async setUserNames(names: string[]) {
    await this.setConfigKey("userNames", names);
  }

  async setGreenTimes(greenDeepth: number) {
    await this.setConfigKey("greenTimes", greenDeepth);
  }

  async setPopDim(dim: number) {
    await this.setConfigKey("popDim", dim);
  }

  async setQualty(quality: number) {
    await this.setConfigKey("quality", quality);
  }
  async setIsPop(usePop: boolean) {
    await this.setConfigKey("usePop", usePop);
  }

  async setIsGreen(isGreen: boolean) {
    await this.setConfigKey("isGreen", isGreen);
  }

  async setUseWaterMark(useWaterMark: boolean) {
    await this.setConfigKey("watermark", useWaterMark);
  }

  async setConfigKey<T extends keyof PatinaConfig>(
    key: T,
    value: PatinaConfig[T],
  ) {
    const newConfig: PatinaConfig = deepinCopy(this.config);
    newConfig[key] = value;
    await this.setConfig(newConfig);
  }

  getConfigKey<T extends keyof PatinaConfig>(
    key: T,
  ): PatinaConfig[T] {
    return this.config[key];
  }

  // set config until running process is done
  setConfig(config: PatinaConfig): Promise<void> {
    return new Promise((resolve, _) => {
      if (JSON.stringify(config) === JSON.stringify(this.config)) {
        resolve();
        return;
      }
      const trySetConfig = (): boolean => {
        if (this.running) {
          return false;
        }
        this.config = config;
        resolve();
        return true;
      };
      if (!trySetConfig()) {
        setTimeout(trySetConfig, 100);
      }
    });
  }

  get outputImg(): HTMLImageElement {
    return this.imgOutput;
  }

  get outputUrl(): string {
    if (this.config.usePop) {
      return this.imgOutputPop.src;
    } else {
      return this.imgOutput.src;
    }
  }

  get srcUrl(): string {
    return this.srcImg.src;
  }

  get srcWidth(): number {
    return Math.min(this.config.maxWidth, this.srcImg.naturalWidth);
  }

  get srcImg(): HTMLImageElement {
    return this.img;
  }

  set srcImg(img: HTMLImageElement) {
    this.img = img;
  }

  setImageSrc(src: string) {
    this.img.src = src;
  }

  private drawMix(canvasSize: Size, naturalSize: Size) {
    const mix = this.config.mix;
    const { width, height } = canvasSize;
    const { width: naturalWidth, height: naturalHeight } = naturalSize;
    if (mix === 1) {
      this.ctx.drawImage(
        this.img!,
        0,
        0,
        naturalWidth,
        naturalHeight,
        0,
        0,
        width,
        height,
      );
    } else {
      const mixedWidth = width / mix;
      const mixedHeight = height / mix;
      this.ctx.drawImage(
        this.img,
        0,
        0,
        naturalWidth,
        naturalHeight,
        (width - mixedWidth) / 2,
        (height - mixedHeight) / 2,
        mixedWidth,
        mixedHeight,
      );
      this.ctx.drawImage(
        this.canvas,
        (width - mixedWidth) / 2,
        (height - mixedHeight) / 2,
        mixedWidth,
        mixedHeight,
        0,
        0,
        width,
        height,
      );
    }
  }

  private drawGreenBase({ width, height }: Size) {
    const imageData = this.ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let p = 0; p < data.length / 4; ++p) {
      const r = data[p * 4];
      const g = data[p * 4 + 1];
      const b = data[p * 4 + 2];
      const y = clamp((77 * r + 150 * g + 29 * b) >> 8);
      const u = clampuv(((-43 * r - 85 * g + 128 * b) >> 8) - 1);
      const v = clampuv(((128 * r - 107 * g - 21 * b) >> 8) - 1);
      data[p * 4] = clamp((65536 * y + 91881 * v) >> 16);
      data[p * 4 + 1] = clamp((65536 * y - 22553 * u - 46802 * v) >> 16);
      data[p * 4 + 2] = clamp((65536 * y + 116130 * u) >> 16);
    }
    this.ctx.putImageData(imageData, 0, 0);
  }

  private drawOthers(
    { width, height }: Size,
  ) {
    const config = this.config;
    let pixel = this.ctx.getImageData(0, 0, width, height);
    let pixelData = pixel.data;
    for (let i = 0; i < pixelData.length; i += 4) {
      const yuv = rgb2yuv(
        pixelData[i],
        pixelData[i + 1],
        pixelData[i + 2],
      );

      pixelData[i] = yuv[0];
      pixelData[i + 1] = yuv[1];
      pixelData[i + 2] = yuv[2];
    }

    if (config.lightNoise) {
      const halt = config.lightNoise / 2;
      for (let i = 0; i < pixelData.length; i += 4) {
        pixelData[i] = pixelData[i] +
          (this.randRange(0, config.lightNoise) - halt); // * (255 - pixelData[i])/255;
      }
    }
    if (config.darkNoise) {
      const halt = config.darkNoise / 2;
      for (let i = 0; i < pixelData.length; i += 4) {
        pixelData[i] = pixelData[i] +
          (this.randRange(0, config.darkNoise) - halt) * (255 - pixelData[i]) /
            255;
        //噪声在亮部不那么明显
      }
    }
    //对比度
    if (config.contrast && config.contrast != 1) {
      for (let i = 0; i < pixelData.length; i += 4) {
        pixelData[i] = (pixelData[i] - 128) * config.contrast + 128;
      }
    }

    //亮度
    if (config.light && config.light != 0) {
      for (let i = 0; i < pixelData.length; i += 4) {
        pixelData[i] = pixelData[i] + config.light * 128;
      }
    }

    //卷积
    if (config.convoluteName) {
      pixel = convolute(
        pixel,
        Convolutes[config.convoluteName],
      );
      pixelData = pixel.data;
    }

    for (let i = 0; i < pixelData.length; i += 4) {
      //绿化
      if (config.isGreen) {
        const gAdd = config.green * 4;
        pixelData[i] -= gAdd * config.gy;
        pixelData[i + 1] -= gAdd;
        pixelData[i + 2] -= gAdd;
      }

      const rgb = yuv2rgb(
        pixelData[i],
        pixelData[i + 1],
        pixelData[i + 2],
      );

      pixelData[i] = rgb[0];
      pixelData[i + 1] = rgb[1];
      pixelData[i + 2] = rgb[2];
    }

    this.ctx.putImageData(pixel, 0, 0);
  }

  private getWatermarkPlan(
    { width, height }: Size,
    shift: number,
    i: number = randRangeGlobal(0, 2),
  ): Plain {
    const newI = i % 3;
    switch (newI) {
      case 0:
        return {
          align: "right",
          left: width - shift * 1.2 + this.randRange(-5, 5),
          top: height - shift + this.randRange(-5, 5),
        };
      case 1:
        return {
          align: "center",
          left: width / 2 + this.randRange(-10, 10),
          top: height - shift * 1.2 + this.randRange(-5, 5),
        };
      case 2:
        return {
          align: "left",
          left: width / 2 + this.randRange(-10, 10),
          top: height / 2 + shift + this.randRange(-10, 10),
        };
    }
    return {
      align: "center",
      left: width / 2 + this.randRange(-10, 10),
      top: height / 2 + shift + this.randRange(-10, 10),
    };
  }

  private drawWaterMark({ width, height }: Size) {
    const config = this.config;
    const randSize = this.randRange(0, 7);
    let fontSize = 22 + randSize;
    fontSize = width / fontSize * config.watermarkSize;

    this.ctx.shadowColor = `rgba(0, 0, 0, ${config.watermarkShadowAlpha})`;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 1;
    this.ctx.shadowBlur = 4;
    const fontString = fontStringLists(this.config);
    this.ctx.font = `${fontSize}px/400 ${fontString}`;
    this.ctx.fillStyle = "#fff";

    const shift = fontSize / 2;
    const watermarkPlan: Plain = this.getWatermarkPlan(
      { width, height },
      shift,
      randRangeGlobal(0, this.config.watermarkPlan),
    );

    this.ctx.textAlign = watermarkPlan.align;
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText(
      "@" + this.randName(config.userNames),
      watermarkPlan.left,
      watermarkPlan.top,
    );
  }

  public patina(callback?: (data: PantaData) => void): Promise<void> {
    const theRoundTime = roundTime(this.config);
    return new Promise((resolve, _) => {
      const patinaInside = () => {
        const config = this.config;
        const imageEl = this.img;

        // because last config is still doing
        if (this.running) {
          setTimeout(patinaInside, 100);
          return;
        }

        this.running = true;
        const naturalWidth = imageEl.naturalWidth;
        const naturalHeight = imageEl.naturalHeight;

        let width = naturalWidth;
        let height = naturalHeight;
        if (config.rand) {
          this.randRange = (a, b) => Math.round(Math.random() * (b - a) + a);
        } else {
          this.randRange = () => 0;
        }

        const scale = naturalWidth / naturalHeight;

        if (config.preview) {
          if (scale > 1) {
            if (naturalWidth > config.maxWidth) {
              width = config.maxWidth;
              height = config.maxWidth / scale;
            }
          } else {
            if (naturalHeight > config.maxWidth) {
              width = config.maxWidth * scale;
              height = config.maxWidth;
            }
          }
        }
        width = Math.floor(width / 100 * config.zoom);
        height = Math.floor(height / 100 * config.zoom);

        this.canvas.width = width;
        this.canvas.height = height;

        // prepare is finished, then we need to transform the output
        requestAnimationFrame((_) => {
          this.ctx.rect(0, 0, width, height);
          this.ctx.fillStyle = "#FFF";
          this.ctx.fill();

          // first we drawMix
          this.drawMix({ width, height }, {
            width: naturalWidth,
            height: naturalHeight,
          });

          if (
            config.lightNoise ||
            config.darkNoise ||
            config.contrast !== 1 ||
            config.light !== 0 ||
            config.green !== 0 ||
            config.convoluteName
          ) {
            this.drawOthers({ width, height });
          }

          const isPop = this.config.usePop;

          let popWidth = width * this.config.popDim;
          let popHeight = height * this.config.popDim;

          if (isPop) {
            if (this.config.popDim && width < this.config.maxWidth) {
              const maxPopWidth = this.config.maxWidth * 2;
              if (popWidth > maxPopWidth) {
                popWidth = maxPopWidth;
                popHeight = maxPopWidth * height / width;
              }
            }
            const maxPopWidth = 4000;
            if (popWidth > maxPopWidth) {
              popWidth = maxPopWidth;
              popHeight = maxPopWidth * height / width;
            }
            this.popCanvas.width = popWidth;
            this.popCanvas.height = popHeight;
          }

          const requestOnce = () => {
            this.currentTime++;
            if (config.watermark) {
              this.drawWaterMark({ width, height });
            }
            if (config.isGreen) {
              this.drawGreenBase({ width, height });
            }
            const popSrc = this.popCanvas.toDataURL(
              "image/jpeg",
              config.quality / 100 + Math.random() * 0.05,
            );
            const src = this.canvas.toDataURL(
              "image/jpeg",
              config.quality / 100 + Math.random() * 0.1,
            );
            this.imgOutput.onload = (_) => {
              const randi = 2;
              const randPix = this.randRange(-randi, randi);
              const randPiy = this.randRange(-randi, randi);

              this.ctx.rect(0, 0, width, height);
              this.ctx.fillStyle = "#FFF";
              this.ctx.fill();
              this.ctx.drawImage(
                this.imgOutput,
                0,
                0,
                width,
                height,
                0 - randPix / 2,
                0 - randPiy / 2,
                width + randPix,
                height + randPiy,
              );
              if (isPop) {
                this.popCtx.drawImage(
                  this.imgOutput,
                  ((this.currentTime - 1) % this.config.popDim) * popWidth /
                    this.config.popDim,
                  Math.floor((this.currentTime - 1) / this.config.popDim) *
                    popHeight /
                    this.config.popDim,
                  popWidth / this.config.popDim,
                  popHeight / this.config.popDim,
                );
              }
              callback && callback(this);
              if (this.currentTime <= theRoundTime) {
                requestOnce();
              } else {
                this.running = false;
                this.currentTime = 0;
                callback && callback(this);
                resolve();
              }
            };
            this.imgOutput.src = src;
            this.imgOutputPop.src = popSrc;
          };

          requestOnce();
        });
      };
      patinaInside();
    });
  }
}

export const defaultConfig: PatinaConfig = {
  rand: true,
  preview: true,
  previewWidth: 400,
  maxWidth: 500,
  zoom: 100,
  mix: 1,
  watermark: true,
  watermarkSize: 2,
  watermarkShadowAlpha: 0.5,
  watermarkPlan: 2,
  userNames: ["JohnDoe", "JaneDoe"],
  lightNoise: 5,
  darkNoise: 5,
  contrast: 0.5,
  light: 0.5,
  isGreen: true,
  green: 0.5,
  gy: 0.5,
  convoluteName: "sauna",
  greenTimes: 10,
  usePop: true,
  popDim: 4,
  quality: 80,

  fonts: ["PingFang SC", "Microsoft YaHei", "sans-serif"],
};

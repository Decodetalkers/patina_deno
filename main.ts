/*!
 * Patina.ts
 * @itorr <https://lab.magiconch.com/>
 * 2022-03-31
 */
// Utility functions
//
let randRange = (a: number, b: number): number =>
  Math.round(Math.random() * (b - a) + a);
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

// deno-fmt-ignore
export const Convolutes = {
  "right": [
    0, -1, 0,
    -1, 2, 2,
    0, -1, 0,
  ],
  "left": [
    0, -1, 0,
    3, 2, -2,
    0, -1, 0,
  ],
  "sauna": [
    1 / 9, 1 / 9, 1 / 9,
    1 / 9, 1 / 9, 1 / 9,
    1 / 9, 1 / 9, 1 / 9,
  ],
  "relief": [
    1, 1, 1,
    1, 1, -1,
    -1, -1, -1,
  ],
};

export type ConvoluteKey = keyof typeof Convolutes;

const randName = (userNames: string[]): string => {
  const k = "-_+~!^&、.。”“\"'|"[randRange(0, 14)];
  return userNames[randRange(0, userNames.length - 1)].replace(
    /\d\d\d\d/,
    () => randRange(0, 9999).toString(),
  ).replace(/_/g, () => k);
};

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;

interface Config {
  rand: boolean;
  preview: boolean;
  maxWidth: number;
  zoom: number;
  shiftx: number;
  shifty: number;
  mix: number;
  watermark: boolean;
  watermarkSize: number;
  watermarkShadowAlpha: number;
  watermarkPlan: number;
  userNames: string[];
  green: boolean;
  lightNoise: number;
  darkNoise: number;
  contrast: number;
  light: number;
  g: number;
  gy: number;
  convoluteName: ConvoluteKey;
  round: number;
  isPop: boolean;
  pop: number;
  quality: number;
}

type Plain = {
  align: CanvasTextAlign;
  left: number;
  top: number;
};

type PaintConfig = {
  usePopUp?: boolean;
  popUp?: number;
  yearsAgo: number;
  rand: boolean;
  maxWidth: number;
  preview: boolean;
  zoom: number;
  mix: number;
  watermark: boolean;
  watermarkSize: number;
  watermarkShadowAlpha: number;

  green: boolean;
  userNames: string[];

  quality: number;
  convoluteName?: ConvoluteKey;
};

export type Size = {
  width: number;
  height: number;
};

export class PantaData {
  img?: HTMLImageElement;
  _output?: string;
  running: boolean = false;
  width?: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  popCanvas: HTMLCanvasElement;
  popCtx: CanvasRenderingContext2D;

  currentTime: number = 0;

  private randRange = (a: number, b: number): number =>
    Math.round(Math.random() * (b - a) + a);
  constructor(img?: HTMLImageElement) {
    this.img = img;
    this.canvas = document.createElement("canvas");
    this.popCanvas = document.createElement("canvas");
    this.ctx = canvas.getContext("2d")!;
    this.popCtx = canvas.getContext("2d")!;
  }

  get output(): string | undefined {
    return this._output;
  }

  get image(): HTMLImageElement | undefined {
    return this.img;
  }

  set image(img: HTMLImageElement) {
    this.img = img;
  }

  private drawMix(canvasSize: Size, naturalSize: Size, mix: number) {
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
        this.img!,
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

  private drawConVulateWithName(name: ConvoluteKey, { width, height }: Size) {
    let pixel = this.ctx.getImageData(0, 0, width, height);

    pixel = convolute(pixel, Convolutes[name]);

    this.ctx.putImageData(pixel, 0, 0);
  }

  private drawGreen({ width, height }: Size) {
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

  private drawWaterMark(config: PaintConfig, { width, height }: Size) {
    const randSize = this.randRange(0, 7);
    let fontSize = 22 + randSize;
    fontSize = width / fontSize * config.watermarkSize;

    this.ctx.shadowColor = `rgba(0, 0, 0, ${config.watermarkShadowAlpha})`;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 1;
    this.ctx.shadowBlur = 4;
    this.ctx.font =
      `${fontSize}px/400 "PingFang SC","Microsoft YaHei",sans-serif`;
    this.ctx.fillStyle = "#fff";

    const shift = fontSize / 2;
    const watermarkPlan: Plain = {
      align: "right",
      left: width - shift * 1.2 + randRange(-5, 5),
      top: height - shift + randRange(-5, 5),
    };

    this.ctx.textAlign = watermarkPlan.align;
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText(
      "@" + randName(config.userNames),
      watermarkPlan.left,
      watermarkPlan.top,
    );
  }

  public patina(config: PaintConfig) {
    const imageEl = this.img;
    if (!imageEl) {
      return;
    }
    // because last config is still doing
    if (this.running) {
      return;
    }

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
    this.width = width;

    // prepare is finished, then we need to transform the output
    requestAnimationFrame((_) => {
      ctx.rect(0, 0, width, height);
      ctx.fillStyle = "#FFF";
      ctx.fill();

      // first we drawMix
      this.drawMix({ width, height }, {
        width: naturalWidth,
        height: naturalHeight,
      }, config.mix);

      if (config.convoluteName) {
        this.drawConVulateWithName(config.convoluteName, { width, height });
      }

      const requestOnce = () => {
        this.currentTime++;
        if (config.watermark) {
          this.drawWaterMark(config, { width, height });
        }
        if (config.green) {
          this.drawGreen({ width, height });
        }
        const src = this.canvas.toDataURL(
          "image/jpeg",
          config.quality / 100 + Math.random() * .1,
        );
        const imgElNew = new Image();

        imageEl.onload = (_) => {
          const randi = 2;
          const randPix = this.randRange(-randi, randi);
          const randPiy = this.randRange(-randi, randi);

          ctx.rect(0, 0, width, height);
          ctx.fillStyle = "#FFF";
          ctx.fill();

          this.ctx.drawImage(
            imgElNew,
            0,
            0,
            width,
            height,
            0 - randPix / 2,
            0 - randPiy / 2,
            width + randPix,
            height + randPiy,
          );
          this._output = src;
          if (this.currentTime < config.yearsAgo) {
            requestOnce();
          } else {
            this.running = false;
            this.currentTime = 0;
          }
        };
        imageEl.src = src;
      };

      requestOnce();
    });
  }
}

export const defaultConfig: Config = {
  rand: false,
  preview: false,
  maxWidth: 800,
  zoom: 100,
  shiftx: 0,
  shifty: 0,
  mix: 1,
  watermark: false,
  watermarkSize: 12,
  watermarkShadowAlpha: 0.5,
  watermarkPlan: 1,
  userNames: ["JohnDoe", "JaneDoe"],
  green: false,
  lightNoise: 5,
  darkNoise: 5,
  contrast: 0.5,
  light: 0.5,
  g: 0.5,
  gy: 0.5,
  convoluteName: "sauna",
  round: 0,
  isPop: false,
  pop: 1,
  quality: 80,
};

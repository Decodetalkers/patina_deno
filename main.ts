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

export const Convolutes = {
  "right": [
    0,
    -1,
    0,
    -1,
    2,
    2,
    0,
    -1,
    0,
  ],
  "left": [
    0,
    -1,
    0,
    3,
    2,
    -2,
    0,
    -1,
    0,
  ],
  "sauna": [
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
  ],
  "relief": [
    1,
    1,
    1,
    1,
    1,
    -1,
    -1,
    -1,
    -1,
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

const popCanvas = document.createElement("canvas");
const popCtx = popCanvas.getContext("2d")!;

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

interface App {
  running: boolean;
  width: number;
  current: number;
  output: string;
  lastConfigString: string | null;
}

type Plain = {
  align: CanvasTextAlign;
  left: number;
  top: number;
};

export function patina(
  imageEl: HTMLImageElement,
  config: Config,
  app: App,
) {
  const naturalWidth = imageEl.naturalWidth;
  const naturalHeight = imageEl.naturalHeight;

  const configString = [
    JSON.stringify(config),
    imageEl.src,
    naturalWidth,
  ].join("-");

  if (!naturalWidth) return;
  if (app.lastConfigString === configString) return;
  if (app.running) return;

  app.running = true;
  app.lastConfigString = configString;

  if (config.rand) {
    randRange = (a, b) => Math.round(Math.random() * (b - a) + a);
  } else {
    randRange = () => 0;
  }

  let width = naturalWidth;
  let height = naturalHeight;
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

  canvas.width = width;
  canvas.height = height;
  app.width == width;

  requestAnimationFrame((_) => {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = "#FFF";
    ctx.fill();

    if (config.mix === 1) {
      ctx.drawImage(
        imageEl,
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
      const mixedWidth = width / config.mix;
      const mixedHeight = height / config.mix;
      ctx.drawImage(
        imageEl,
        0,
        0,
        naturalWidth,
        naturalHeight,
        (width - mixedWidth) / 2,
        (height - mixedHeight) / 2,
        mixedWidth,
        mixedHeight,
      );
      ctx.drawImage(
        canvas,
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

    const watermark = () => {
      const randSize = randRange(0, 7);
      let fontSize = 22 + randSize;
      fontSize = width / fontSize * config.watermarkSize;

      ctx.shadowColor = `rgba(0, 0, 0, ${config.watermarkShadowAlpha})`;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 4;
      ctx.font = `${fontSize}px/400 "PingFang SC","Microsoft YaHei",sans-serif`;
      ctx.fillStyle = "#fff";

      const shift = fontSize / 2;
      const watermarkPlan: Plain = {
        align: "right",
        left: width - shift * 1.2 + randRange(-5, 5),
        top: height - shift + randRange(-5, 5),
      };

      ctx.textAlign = watermarkPlan.align;
      ctx.textBaseline = "bottom";
      ctx.fillText(
        "@" + randName(config.userNames),
        watermarkPlan.left,
        watermarkPlan.top,
      );
    };

    const green = () => {
      const imageData = ctx.getImageData(0, 0, width, height);
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
      ctx.putImageData(imageData, 0, 0);
    };

    if (config.watermark) {
      watermark();
    }

    if (config.green) {
      green();
    }

    if (
      config.lightNoise || config.darkNoise || config.contrast !== 1 ||
      config.light !== 1 || config.g !== 0 || config.convoluteName
    ) {
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixelData = imageData.data;
      for (let p = 0; p < pixelData.length / 4; ++p) {
        const r = pixelData[p * 4];
        const g = pixelData[p * 4 + 1];
        const b = pixelData[p * 4 + 2];
        const yuv = rgb2yuv(
          r,
          g,
          b,
        );

        pixelData[p * 4] = yuv[0];
        pixelData[p * 4 + 1] = yuv[1];
        pixelData[p * 4 + 2] = yuv[2];
      }
      ctx.putImageData(imageData, 0, 0);

      if (config.lightNoise) {
        const halt = config.lightNoise / 2;
        for (let i = 0; i < pixelData.length; i += 4) {
          pixelData[i] = pixelData[i] +
            (randRange(0, config.lightNoise) - halt); // * (255 - pixelData[i])/255;
        }
      }
      if (config.darkNoise) {
        const halt = config.darkNoise / 2;
        for (let i = 0; i < pixelData.length; i += 4) {
          pixelData[i] = pixelData[i] +
            (randRange(0, config.darkNoise) - halt) * (255 - pixelData[i]) /
              255;
          //噪声在亮部不那么明显
        }
      }

      //对比度
      if (config.contrast !== 1) {
        for (let i = 0; i < pixelData.length; i += 4) {
          pixelData[i] = (pixelData[i] - 128) * config.contrast + 128;
        }
      }

      //亮度
      if (config.light !== 0) {
        for (let i = 0; i < pixelData.length; i += 4) {
          pixelData[i] = pixelData[i] + config.light * 128;
        }
      }
      if (config.convoluteName) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const convoluted = convolute(
          imageData,
          Convolutes[config.convoluteName],
        );
        ctx.putImageData(convoluted, 0, 0);
      }
      for (let i = 0; i < pixelData.length; i += 4) {
        //绿化
        if (config.g) {
          const gAdd = config.g * 4;
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

      let round = config.round;
      let i = 1;
      app.current = 1;

      let popWidth = width * config.pop;
      let popHeight = height * config.pop;

      const isPop = config.pop;
      if (isPop) {
        round = Math.pow(config.pop, 2);
        if (config.preview && width < config.maxWidth) {
          const maxPopWidth = config.maxWidth * 2;

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

        popCanvas.width = popWidth;
        popCanvas.height = popHeight;
      }

      const do_onetime = () => {
        i++;
        app.current++;
        if (config.watermark) {
          watermark();
        }
        if (config.green) {
          green();
        }

        const src = canvas.toDataURL(
          "image/jpeg",
          config.quality / 100 + Math.random() * 0.1,
        );

        const imgEl = new Image();
        imgEl.onload = (_) => {
          const randi = 2;
          const randPix = randRange(-randi, randi);
          const randPiy = randRange(-randi, randi);

          ctx.rect(0, 0, width, height);
          ctx.fillStyle = "#FFF";
          ctx.fill();

          ctx.drawImage(
            imgEl,
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
            popCtx.drawImage(
              imgEl,
              (i - 1) % config.pop * popWidth / config.pop,
              Math.floor((i - 1) / config.pop) * popHeight / config.pop,
              popWidth / config.pop,
              popHeight / config.pop,
            );
          }

          app.output = src;

          if (i < round) {
            do_onetime();
          } else {
            app.running = false;
            app.current = 0;

            if (isPop) {
              app.output = popCanvas.toDataURL(
                "image/jpeg",
                config.quality / 100 + Math.random() * 0.05,
              );
            }
          }
        };
      };
      const src = canvas.toDataURL(
        "image/jpeg",
        config.quality / 100 + Math.random() * 0.05,
      );
      const imgEl = new Image();

      imgEl.onload = (_) => {
        // console.log(/原本执行那一次质量调整/,i)

        ctx.drawImage(
          imgEl,
          0,
          0,
          width,
          height,
        );

        if (isPop) {
          popCtx.drawImage(
            imgEl,
            0,
            0,
            popWidth / config.pop,
            popHeight / config.pop,
          );
        }

        app.output = src;

        if (round === 1) {
          app.running = false;
          app.current = 0;
        } else {
          do_onetime();
        }
      };
      imgEl.src = src;
      app.output = src;
    }
  });
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

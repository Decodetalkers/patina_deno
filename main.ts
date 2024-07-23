
/*!
 * Patina.ts
 * @itorr <https://lab.magiconch.com/>
 * 2022-03-31
 */

// Utility functions
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

const yuv2rgb = (y: number, u: number, v: number): [number, number, number] => {
  const r = clamp(Math.floor(y + 1.4075 * (v - 128)));
  const g = clamp(Math.floor(y - 0.3455 * (u - 128) - 0.7169 * (v - 128)));
  const b = clamp(Math.floor(y + 1.779 * (u - 128)));
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

const Convolutes: { [key: string]: number[] } = {
  "右倾": [
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
  "左倾": [
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
  "桑拿": [
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
  "浮雕": [
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

const convoluteNames = Object.keys(Convolutes);

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

let lastConfigString: string | null = null;

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
  convoluteName: string;
  round: number;
  isPop: boolean;
  pop: number;
  quality: number;
}

interface App {
  runing: boolean;
  width: number;
  current: number;
  output: string;
}

type Plain = {
  align: CanvasTextAlign;
  left: number;
  top: number;
};

const patina = (imageEl: HTMLImageElement, _config: Config, app: App): void => {
  const naturalWidth = imageEl.naturalWidth;
  const naturalHeight = imageEl.naturalHeight;

  const configString = [
    JSON.stringify(_config),
    imageEl.src,
    naturalWidth,
  ].join("-");

  if (!naturalWidth) return;
  if (lastConfigString === configString) return;
  if (app.runing) return;

  app.runing = true;
  lastConfigString = configString;

  if (_config.rand) {
    randRange = (a: number, b: number) =>
      Math.round(Math.random() * (b - a) + a);
  } else {
    randRange = () => 0;
  }

  let _width = naturalWidth;
  let _height = naturalHeight;
  const scale = naturalWidth / naturalHeight;

  if (_config.preview) {
    if (scale > 1) {
      if (naturalWidth > _config.maxWidth) {
        _width = _config.maxWidth;
        _height = _config.maxWidth / scale;
      }
    } else {
      if (naturalHeight > _config.maxWidth) {
        _width = _config.maxWidth * scale;
        _height = _config.maxWidth;
      }
    }
  }

  _width = Math.floor(_width / 100 * _config.zoom);
  _height = Math.floor(_height / 100 * _config.zoom);

  canvas.width = _width;
  canvas.height = _height;

  app.width = _width;

  requestAnimationFrame(() => {
    let cutLeft = 0;
    let cutTop = 0;
    let calcWidth = naturalWidth;
    let calcHeight = naturalHeight;
    let setLeft = 0;
    let setTop = 0;
    let setWidth = _width;
    let setHeight = _height;

    setLeft = setLeft + _config.shiftx;
    setTop = setTop + _config.shifty;

    ctx.rect(0, 0, _width, _height);
    ctx.fillStyle = "#FFF";
    ctx.fill();

    if (_config.mix === 1) {
      ctx.drawImage(
        imageEl,
        cutLeft,
        cutTop,
        calcWidth,
        calcHeight,
        setLeft,
        setTop,
        setWidth,
        setHeight,
      );
    } else {
      const mixedWidth = _width / _config.mix;
      const mixedHeight = _height / _config.mix;

      ctx.drawImage(
        imageEl,
        cutLeft,
        cutTop,
        calcWidth,
        calcHeight,
        (_width - mixedWidth) / 2,
        (_height - mixedHeight) / 2,
        mixedWidth,
        mixedHeight,
      );

      ctx.drawImage(
        canvas,
        (_width - mixedWidth) / 2,
        (_height - mixedHeight) / 2,
        mixedWidth,
        mixedHeight,
        setLeft,
        setTop,
        setWidth,
        setHeight,
      );
    }

    const getWatermarkPlan = (
      shift: number,
      i: number = randRange(0, 2),
    ): Plain | undefined => {
      switch (i) {
        case 0:
          return {
            align: "right",
            left: _width - shift * 1.2 + randRange(-5, 5),
            top: _height - shift + randRange(-5, 5),
          };
        case 1:
          return {
            align: "center",
            left: _width / 2 + randRange(-10, 10),
            top: _height - shift * 1.2 + randRange(-5, 5),
          };
        case 2:
          return {
            align: "left",
            left: shift * 1.2 + randRange(-5, 5),
            top: _height - shift + randRange(-5, 5),
          };
      }
    };

    const applyWatermark = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      alpha: number,
    ) => {
      if (_config.watermark && _config.userNames.length) {
        ctx.save();
        const shift = Math.round(_config.watermarkSize / 2);
        const plan = getWatermarkPlan(shift, _config.watermarkPlan);

        const _name = randName(_config.userNames);

        ctx.font =
          `${_config.watermarkSize}px "Source Han Sans CN","Source Han Sans SC","Noto Sans SC","黑体-简","Heiti SC","WenQuanYi Micro Hei","黑体","STHeiti","Microsoft YaHei","sans-serif"`;
        if (_config.watermarkShadowAlpha > 0) {
          ctx.globalAlpha = _config.watermarkShadowAlpha;
          ctx.fillStyle = "#FFF";
          ctx.textAlign = plan!.align;
          ctx.textBaseline = "middle";
          ctx.fillText(_name, plan!.left, plan!.top + shift);
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#000";
        ctx.textAlign = plan!.align;
        ctx.textBaseline = "middle";
        ctx.fillText(_name, plan!.left, plan!.top + shift);
        ctx.restore();
      }
    };

    const applyNoise = (
      imageData: ImageData,
      lightNoise: number,
      darkNoise: number,
    ) => {
      if (lightNoise + darkNoise > 0) {
        const d = imageData.data;
        const len = d.length;
        const m = lightNoise + darkNoise;

        for (let i = 0; i < len; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          const [y, u, v] = rgb2yuv(r, g, b);

          const n = randRange(-m, m);

          let newY = y;
          if (n < 0) newY = y + n * (darkNoise / m);
          else newY = y + n * (lightNoise / m);

          const [nr, ng, nb] = yuv2rgb(
            clamp(newY),
            clampuv(u + randRange(-10, 10)),
            clampuv(v + randRange(-10, 10)),
          );

          d[i] = nr;
          d[i + 1] = ng;
          d[i + 2] = nb;
        }
      }
    };

    const applyBrightnessContrast = (
      imageData: ImageData,
      brightness: number,
      contrast: number,
    ) => {
      if (contrast > 0) {
        const d = imageData.data;
        const len = d.length;

        for (let i = 0; i < len; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          const [y, u, v] = rgb2yuv(r, g, b);

          const newY = y + (contrast > 0 ? (255 - y) : y) * contrast;

          const [nr, ng, nb] = yuv2rgb(
            clamp(newY),
            u,
            v,
          );

          d[i] = nr;
          d[i + 1] = ng;
          d[i + 2] = nb;
        }
      }
    };

    const applyGreenify = (imageData: ImageData, g: number, gy: number) => {
      if (g > 0) {
        const d = imageData.data;
        const len = d.length;

        for (let i = 0; i < len; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          const [y, u, v] = rgb2yuv(r, g, b);

          const [nr, ng, nb] = yuv2rgb(
            y,
            clampuv(u),
            clampuv(v - g * (y - gy) / 255),
          );

          d[i] = nr;
          d[i + 1] = ng;
          d[i + 2] = nb;
        }
      }
    };

    const imageData = ctx.getImageData(0, 0, _width, _height);

    applyWatermark(ctx, _width, _height, 0.3);
    applyNoise(imageData, _config.lightNoise, _config.darkNoise);
    applyBrightnessContrast(imageData, _config.light, _config.contrast);
    applyGreenify(imageData, _config.g, _config.gy);

    const convoluteWeights = Convolutes[_config.convoluteName];
    if (convoluteWeights) {
      const convoluted = convolute(imageData, convoluteWeights);
      ctx.putImageData(convoluted, 0, 0);
    }

    ctx.putImageData(imageData, 0, 0);

    app.runing = false;
  });
};

const Config: Config = {
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
  convoluteName: "桑拿",
  round: 0,
  isPop: false,
  pop: 1,
  quality: 80,
};

const App: App = {
  runing: false,
  width: 800,
  current: 0,
  output: "",
};

export { App, Config, patina };

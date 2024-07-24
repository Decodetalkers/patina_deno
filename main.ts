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

//const convoluteNames = Object.keys(Convolutes);

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

const lastConfigString: string | null = null;

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

const patina = (
  imageEl: HTMLImageElement,
  _config: Config,
  app: App,
): Uint8Array | undefined => {
  const naturalWidth = imageEl.naturalWidth;
  const naturalHeight = imageEl.naturalHeight;

  const configString = [
    JSON.stringify(_config),
    imageEl.src,
    naturalWidth,
  ].join("-");

  if (!naturalWidth) return;
  if (app.lastConfigString === configString) return;
  if (app.running) return;

  app.running = true;
  app.lastConfigString = configString;

  if (_config.rand) {
    randRange = (a, b) => Math.round(Math.random() * (b - a) + a);
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

  ctx.rect(0, 0, _width, _height);
  ctx.fillStyle = "#FFF";
  ctx.fill();

  if (_config.mix === 1) {
    ctx.drawImage(
      imageEl,
      0,
      0,
      naturalWidth,
      naturalHeight,
      0,
      0,
      _width,
      _height,
    );
  } else {
    const mixedWidth = _width / _config.mix;
    const mixedHeight = _height / _config.mix;
    ctx.drawImage(
      imageEl,
      0,
      0,
      naturalWidth,
      naturalHeight,
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
      0,
      0,
      _width,
      _height,
    );
  }

  const watermark = () => {
    const randSize = randRange(0, 7);
    let fontSize = 22 + randSize;
    fontSize = _width / fontSize * _config.watermarkSize;

    ctx.shadowColor = `rgba(0, 0, 0, ${_config.watermarkShadowAlpha})`;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 4;
    ctx.font = `${fontSize}px/400 "PingFang SC","Microsoft YaHei",sans-serif`;
    ctx.fillStyle = "#fff";

    const shift = fontSize / 2;
    const watermarkPlan: Plain = {
      align: "right",
      left: _width - shift * 1.2 + randRange(-5, 5),
      top: _height - shift + randRange(-5, 5),
    };

    ctx.textAlign = watermarkPlan.align;
    ctx.textBaseline = "bottom";
    ctx.fillText(
      "@" + randName(_config.userNames),
      watermarkPlan.left,
      watermarkPlan.top,
    );
  };

  if (_config.watermark) {
    watermark();
  }

  if (_config.green) {
    const imageData = ctx.getImageData(0, 0, _width, _height);
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
  }

  if (
    _config.lightNoise || _config.darkNoise || _config.contrast !== 1 ||
    _config.light !== 1 || _config.g !== 0 || _config.convoluteName
  ) {
    const imageData = ctx.getImageData(0, 0, _width, _height);
    const data = imageData.data;
    for (let p = 0; p < data.length / 4; ++p) {
      const r = data[p * 4];
      const g = data[p * 4 + 1];
      const b = data[p * 4 + 2];
      const yuv = rgb2yuv(
        r,
        g,
        b,
      );

      data[p * 4] = yuv[0];
      data[p * 4 + 1] = yuv[1];
      data[p * 4 + 2] = yuv[2];
    }
    ctx.putImageData(imageData, 0, 0);
  }

  if (_config.convoluteName) {
    const imageData = ctx.getImageData(0, 0, _width, _height);
    const convoluted = convolute(imageData, Convolutes[_config.convoluteName]);
    ctx.putImageData(convoluted, 0, 0);
  }

  if (_config.pop) {
    popCtx.drawImage(canvas, 0, 0);
    const imageData = popCtx.getImageData(0, 0, _width, _height);
    const data = imageData.data;
    for (let p = 0; p < data.length / 4; ++p) {
      const r = data[p * 4];
      const g = data[p * 4 + 1];
      const b = data[p * 4 + 2];
      const [y, u, v] = rgb2yuv(r, g, b);
      data[p * 4] = clamp(y + _config.pop * (y - 128));
      data[p * 4 + 1] = clamp(y + _config.pop * (u - 128));
      data[p * 4 + 2] = clamp(y + _config.pop * (v - 128));
    }
    popCtx.putImageData(imageData, 0, 0);
  }

  app.running = false;
  const message = canvas.toDataURL();
  return new TextEncoder().encode(message);
};

const config: Config = {
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

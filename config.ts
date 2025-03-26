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

export type Plain = {
  align: CanvasTextAlign;
  left: number;
  top: number;
};

export type PaintConfig = {
  usePopUp: boolean;
  popUp: number;
  greenTimes: number;
  rand: boolean;
  maxWidth: number;
  preview: boolean;
  zoom: number;
  mix: number;
  watermark: boolean;
  watermarkSize: number;
  watermarkShadowAlpha: number;
  watermarkPlan: number;

  green?: number;
  gy: number;
  userNames: string[];

  quality: number;
  convoluteName?: ConvoluteKey;

  lightNoise?: number;
  darkNoise?: number;
  contrast?: number;
  light?: number;

  fonts: string[];
};

export function fontStringLists(config: PaintConfig): string {
  const outputs = [];

  for (const font of config.fonts) {
    let fixedFont = font;
    if (font.includes(" ")) {
      fixedFont = `"${font}"`;
    }
    outputs.push(fixedFont);
  }
  return outputs.join(",");
}

import { defaultConfig, type PatinaConfig } from "@nobody/patina";
export type Cookie = {
  usePop?: boolean;
  useRand?: boolean;
  popDim?: number;
  quality?: number;
  waterMark?: boolean;
  green?: boolean;
  yearsAgo?: number;
  userNames?: string[];
};

export function getCookie(): Cookie {
  try {
    return JSON.parse(document.cookie);
  } catch (_) {
    console.log("error?");
    return {};
  }
}

export function getInitConfig(initConfig: Cookie = {}): PatinaConfig {
  const config = defaultConfig;

  const cookieConfig = initConfig || getCookie();

  if (cookieConfig.green != undefined) {
    config.isGreen = cookieConfig.green;
  }

  if (cookieConfig.yearsAgo != undefined) {
    config.greenTimes = cookieConfig.yearsAgo;
  }

  if (cookieConfig.waterMark != undefined) {
    config.watermark = cookieConfig.waterMark;
  }

  if (cookieConfig.usePop != undefined) {
    config.usePop = cookieConfig.usePop;
  }
  if (cookieConfig.useRand != undefined) {
    config.rand = cookieConfig.useRand;
  }
  if (cookieConfig.popDim != undefined) {
    config.popDim = cookieConfig.popDim;
  }

  if (cookieConfig.quality != undefined) {
    config.quality = cookieConfig.quality;
  }

  if (cookieConfig.userNames != undefined) {
    config.userNames = cookieConfig.userNames;
  }
  return config;
}

export function updateCookie(config: Cookie) {
  document.cookie = JSON.stringify(config);
}

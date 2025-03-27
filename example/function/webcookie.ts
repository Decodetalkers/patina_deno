import { defaultConfig, type PatinaConfig } from "@nobody/patina";
export type Cookie = {
  usePop?: boolean;
  waterMark?: boolean;
  green?: boolean;
  yearsAgo?: number;
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

  return config;
}

export function updateCookie(config: Cookie) {
  document.cookie = JSON.stringify(config);
}

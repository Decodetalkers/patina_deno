import { assertEquals } from "@std/assert";

import { defaultConfig } from "./mod.ts";

import { fontStringLists } from "./config.ts";

Deno.test(function fontCheck() {
  const fontString = fontStringLists(defaultConfig);

  assertEquals(fontString, `"PingFang SC","Microsoft YaHei",sans-serif`);
});

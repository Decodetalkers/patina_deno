import { assertEquals } from "@std/assert";

import { defaultConfig, fontStringLists } from "./mod.ts";

Deno.test(function fontCheck() {
  const fontString = fontStringLists(defaultConfig);

  assertEquals(fontString, `"PingFang SC","Microsoft YaHei",sans-serif`);
});

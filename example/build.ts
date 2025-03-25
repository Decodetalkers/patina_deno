import {
  GenWebsite,
  refreshMiddleware,
  Route,
  watchChanges,
  WebPageUnit,
} from "@nobody/tananoni";
import { serveDir } from "@std/http";

import { parseArgs } from "@std/cli/parse-args";
interface BuildMode {
  debug?: boolean;
  release?: boolean;
}

const input_args = parseArgs(Deno.args) as BuildMode;

const release_mode = input_args.release;

const route = new Route()
  .appendAssert({ path: "favicon.ico" })
  .appendAssert({ path: "./static" })
  .appendWebPage(
    new WebPageUnit(
      "src/main.tsx",
      [{ type: "main", id: "mount" }],
      [{ src: "main.js" }],
    )
      .withTitle("index")
      .withLinkInfos([
        {
          type: "icon",
          href: "favicon.ico",
        },
        { type: "stylesheet", href: "static/global.css" },
      ])
      .withHotReload(),
  )
  .withHotReload(true);
const webgen = new GenWebsite()
  .withLogLevel("info")
  .withImportSource("npm:preact");

await webgen.generateWebsite(route);

if (release_mode) {
  Deno.exit();
}

const fsRoot = `${Deno.cwd()}/dist/`;
Deno.serve({ hostname: "localhost", port: 8000 }, async (req) => {
  const res = refreshMiddleware(req);

  if (res) {
    return res;
  }

  return await serveDir(req, { fsRoot });
});

async function fsWatch() {
  await webgen.generateWebsite(route);
}

await watchChanges({
  watchedDir: "./",
  watchedFileTypes: [".ts", ".tsx", ".css"],
  excludes: ["dist", "build.ts"],
  fallback: fsWatch,
});

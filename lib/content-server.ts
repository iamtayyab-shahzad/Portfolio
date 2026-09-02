import "server-only";

import fs from "node:fs";
import path from "node:path";

export function readJsonCollection<T>(relativeDir: string): Array<T & { slug: string }> {
  const dir = path.join(process.cwd(), relativeDir);
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const slug = file.replace(/\.json$/, "");
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")) as T;
      return { slug, ...data };
    });
}

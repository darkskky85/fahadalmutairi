import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { extname } from "node:path";

const output = "dist";
const client = `${output}/client`;
const publicExtensions = new Set([
  ".html", ".css", ".png", ".jpg", ".jpeg", ".webp", ".pdf",
  ".docx", ".xlsx", ".xml", ".zip"
]);

await rm(output, { recursive: true, force: true });
await mkdir(`${output}/server`, { recursive: true });
await mkdir(client, { recursive: true });
await cp("site-worker.js", `${output}/server/index.js`);

for (const entry of await readdir(".", { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  if (entry.name === "_headers" || publicExtensions.has(extname(entry.name).toLowerCase())) {
    await cp(entry.name, `${client}/${entry.name}`);
  }
}

console.log("Static site build complete.");

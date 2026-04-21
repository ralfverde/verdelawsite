#!/usr/bin/env node
/**
 * Merges messages/_parts/{locale}/*.json into messages/{locale}.json.
 * Deep-merges sibling keys; later files win on conflicts (sorted by filename).
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, "..", "messages");
const locales = ["en", "es"];

function isObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

function deepMerge(a, b) {
  if (!isObject(a) || !isObject(b)) return b;
  const out = { ...a };
  for (const k of Object.keys(b)) {
    out[k] = isObject(a[k]) && isObject(b[k]) ? deepMerge(a[k], b[k]) : b[k];
  }
  return out;
}

for (const locale of locales) {
  const dir = join(messagesDir, "_parts", locale);
  let merged = {};
  const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
  for (const file of files) {
    const part = JSON.parse(readFileSync(join(dir, file), "utf8"));
    merged = deepMerge(merged, part);
  }
  const out = join(messagesDir, `${locale}.json`);
  writeFileSync(out, JSON.stringify(merged, null, 2) + "\n");
  console.log(`built ${out} from ${files.length} parts`);
}

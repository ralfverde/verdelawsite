#!/usr/bin/env node
/**
 * Fails the build if messages/en.json and messages/es.json have
 * different key sets. Run after build-messages.mjs.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, "..", "messages");

const en = JSON.parse(readFileSync(join(messagesDir, "en.json"), "utf8"));
const es = JSON.parse(readFileSync(join(messagesDir, "es.json"), "utf8"));

function keys(obj, prefix = "") {
  const out = [];
  for (const k of Object.keys(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out.push(...keys(v, full));
    } else {
      out.push(full);
    }
  }
  return out;
}

const enKeys = new Set(keys(en));
const esKeys = new Set(keys(es));
const missingInEs = [...enKeys].filter((k) => !esKeys.has(k));
const missingInEn = [...esKeys].filter((k) => !enKeys.has(k));

if (missingInEs.length === 0 && missingInEn.length === 0) {
  console.log(`validate-messages: OK (${enKeys.size} keys match between EN and ES)`);
  process.exit(0);
}

if (missingInEs.length) {
  console.error(`\n${missingInEs.length} keys in EN but missing in ES:`);
  for (const k of missingInEs) console.error(`  ${k}`);
}
if (missingInEn.length) {
  console.error(`\n${missingInEn.length} keys in ES but missing in EN:`);
  for (const k of missingInEn) console.error(`  ${k}`);
}
console.error(`\nTranslation mismatch — fix before deploying.\n`);
process.exit(1);

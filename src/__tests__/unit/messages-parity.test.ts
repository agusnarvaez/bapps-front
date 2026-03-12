import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

function getAllKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.push(fullKey);
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key] as Record<string, unknown>, fullKey));
    }
  }
  return keys;
}

const messagesDir = join(__dirname, "../../../src/messages");
const es = JSON.parse(readFileSync(join(messagesDir, "es.json"), "utf-8"));
const en = JSON.parse(readFileSync(join(messagesDir, "en.json"), "utf-8"));

describe("Messages parity (ES ↔ EN)", () => {
  const esKeys = getAllKeys(es);
  const enKeys = getAllKeys(en);

  it("both files have the same top-level keys", () => {
    expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort());
  });

  it("ES and EN have the same nested key structure", () => {
    expect(esKeys.sort()).toEqual(enKeys.sort());
  });

  it("no empty string values in ES", () => {
    const emptyKeys = esKeys.filter((key) => {
      const val = key.split(".").reduce((o: Record<string, unknown>, k) => (o as Record<string, unknown>)?.[k] as Record<string, unknown>, es);
      return typeof val === "string" && val.trim() === "";
    });
    expect(emptyKeys).toEqual([]);
  });

  it("no empty string values in EN", () => {
    const emptyKeys = enKeys.filter((key) => {
      const val = key.split(".").reduce((o: Record<string, unknown>, k) => (o as Record<string, unknown>)?.[k] as Record<string, unknown>, en);
      return typeof val === "string" && val.trim() === "";
    });
    expect(emptyKeys).toEqual([]);
  });

  it("keys only present in ES are zero", () => {
    const onlyInEs = esKeys.filter((k) => !enKeys.includes(k));
    expect(onlyInEs).toEqual([]);
  });

  it("keys only present in EN are zero", () => {
    const onlyInEn = enKeys.filter((k) => !esKeys.includes(k));
    expect(onlyInEn).toEqual([]);
  });
});

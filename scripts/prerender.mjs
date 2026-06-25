#!/usr/bin/env node
/**
 * Prerenders all routes from public/sitemap.xml into dist/.
 * Runs AFTER pnpm build. Each route gets its own dist/{route}/index.html
 * so Apache serves it as a static file — visible to all crawlers.
 *
 * Usage:  node scripts/prerender.mjs
 *         (called automatically by pnpm build:prerender)
 */

import puppeteer from "puppeteer";
import { spawn, execSync } from "child_process";
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const PORT = 4174;
const SITE = "https://bapps.com.ar";
const BASE = `http://localhost:${PORT}`;

if (!existsSync(DIST)) {
  console.error("dist/ not found — run pnpm build first.");
  process.exit(1);
}

// Extract unique pathnames from sitemap
const sitemap = readFileSync(resolve(ROOT, "public/sitemap.xml"), "utf-8");
const routes = [
  ...new Set(
    [...sitemap.matchAll(/<loc>https?:\/\/bapps\.com\.ar(\/[^<]+)<\/loc>/g)].map(
      (m) => m[1]
    )
  ),
];

console.log(`Prerendering ${routes.length} routes...\n`);

function startServer() {
  // Single string avoids Node.js deprecation warning about args + shell:true
  const proc = spawn(
    `pnpm preview --port ${PORT} --strictPort`,
    [],
    { cwd: ROOT, shell: true, stdio: "pipe" }
  );

  return new Promise((ok, fail) => {
    const timer = setTimeout(
      () => fail(new Error("Preview server startup timed out")),
      30_000
    );
    const check = (buf) => {
      if (buf.toString().includes(String(PORT))) {
        clearTimeout(timer);
        setTimeout(() => ok(proc), 1200); // larger buffer for 3D assets
      }
    };
    proc.stdout.on("data", check);
    proc.stderr.on("data", check);
    proc.on("error", fail);
  });
}

function killServer(proc) {
  if (process.platform === "win32") {
    try {
      execSync(`taskkill /pid ${proc.pid} /T /F`, { stdio: "ignore" });
    } catch {}
  } else {
    proc.kill("SIGTERM");
  }
}

async function prerender() {
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let ok = 0;
  let fail = 0;

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });

      try {
        // 'load' is more reliable than 'networkidle2' for pages with
        // Three.js / WebGL animation loops that keep connections "active"
        await page.goto(`${BASE}${route}`, {
          waitUntil: "load",
          timeout: 60_000,
        });

        // Wait for React root to have content
        await page.waitForSelector("#root > *", { timeout: 10_000 }).catch(() => {});

        // Wait for blog post spinners to disappear (Sanity fetch)
        await page
          .waitForFunction(() => !document.querySelector(".animate-spin"), {
            timeout: 15_000,
            polling: 300,
          })
          .catch(() => {});

        // Per-route fixes: canonical, og:url, lang attribute
        await page.evaluate(
          (site, r) => {
            const qs = (s) => document.querySelector(s);
            document.documentElement.lang = r.startsWith("/en/") ? "en" : "es";
            const canonical = qs('link[rel="canonical"]');
            if (canonical) canonical.setAttribute("href", `${site}${r}`);
            const ogUrl = qs('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute("content", `${site}${r}`);
          },
          SITE,
          route
        );

        const html = await page.content();
        const parts = route.split("/").filter(Boolean);
        const file = resolve(DIST, ...parts, "index.html");
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html, "utf-8");

        console.log(`  OK  ${route}`);
        ok++;
      } catch (err) {
        console.error(`  FAIL  ${route} — ${err.message}`);
        fail++;
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    killServer(server);
  }

  console.log(`\n${ok} rendered, ${fail} failed.`);
  console.log("Upload dist/ to Hostinger via FTP as usual.\n");
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});

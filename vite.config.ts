import { defineConfig, type Plugin } from "vite";
// @ts-expect-error The package "vite-plugin-raw" does not include type declarations
import raw from "vite-plugin-raw";
import react from "@vitejs/plugin-react";
import { readFileSync, readdirSync } from "fs";
import { basename, extname, resolve } from "path";
import puppeteer from "puppeteer-core";
import { buildCombatBadgeSvg } from "./src/features/combat/domain/conditionBadgeAssets.ts";

function combatBadgeAssetsPlugin(): Plugin {
  const iconRoot = resolve(import.meta.dirname, "src/assets/third-party/tw-dnd-icons");
  const svgSources = new Map<string, string>();

  const addDirectoryAssets = (directory: string, rename: (fileName: string) => string = (name) => name) => {
    const absoluteDirectory = resolve(iconRoot, directory);
    for (const fileName of readdirSync(absoluteDirectory)) {
      if (extname(fileName) !== ".svg") continue;
      svgSources.set(
        rename(basename(fileName, ".svg")),
        readFileSync(resolve(absoluteDirectory, fileName), "utf8"),
      );
    }
  };

  addDirectoryAssets("condition");
  addDirectoryAssets("damage", (name) => name === "cold" ? "speed-reduction" : name);
  addDirectoryAssets("movement");
  addDirectoryAssets("spell");
  svgSources.set(
    "dead",
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g transform="scale(5)"><path d="M6 8a4 4 0 0 1 8 0v3H6zM4 16l12-12M16 16 4 4" fill="none" stroke="#fff" stroke-width="1.4"/></g></svg>',
  );
  svgSources.set(
    "custom",
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="20"/></svg>',
  );

  const badgeAssets = new Map(
    Array.from(svgSources, ([key, source]) => [key, buildCombatBadgeSvg(source, key)]),
  );

  return {
    name: "combat-badge-assets",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0];
        if (!pathname?.startsWith("/combat-badges/") || !pathname.endsWith(".svg")) {
          next();
          return;
        }

        const key = pathname.slice("/combat-badges/".length, -".svg".length);
        const svg = badgeAssets.get(key);
        if (!svg) {
          next();
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.end(svg);
      });
    },
    generateBundle() {
      for (const [key, svg] of badgeAssets) {
        this.emitFile({
          type: "asset",
          fileName: `combat-badges/${key}.svg`,
          source: svg,
        });
      }
    },
  };
}

function browserBridgePlugin(): Plugin {
  return {
    name: "browser-bridge",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/browser/status" || req.url === "/api/brave/status") {
          try {
            const browser = await puppeteer.connect({ browserURL: "http://127.0.0.1:9222" });
            const pages = await browser.pages();
            const ddbPage = pages.find((p) => p.url().includes("dndbeyond.com"));
            const title = ddbPage ? await ddbPage.title() : null;
            const url = ddbPage ? ddbPage.url() : null;
            await browser.disconnect();

            let browserName = "Browser";
            try {
              const vResp = await fetch("http://127.0.0.1:9222/json/version");
              if (vResp.ok) {
                const vData = (await vResp.json()) as { Browser?: string };
                if (vData.Browser) {
                  browserName = vData.Browser.split("/")[0];
                }
              }
            } catch {}

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ connected: true, browserName, activeTitle: title, activeUrl: url }));
            return;
          } catch {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ connected: false }));
            return;
          }
        }

        if (req.url?.startsWith("/api/browser/active-monster") || req.url?.startsWith("/api/brave/active-monster")) {
          try {
            const browser = await puppeteer.connect({ browserURL: "http://127.0.0.1:9222" });
            const pages = await browser.pages();
            const ddbPage = pages.find((p) => p.url().includes("dndbeyond.com/monsters/"));
            if (!ddbPage) {
              await browser.disconnect();
              res.statusCode = 404;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "No active monster detail tab found in your connected browser. Please open a monster page." }));
              return;
            }
            const html = (await ddbPage.evaluate(`(() => {
              const b = document.querySelector(".mon-stat-block, .mon-stat-block-2024");
              return b ? b.outerHTML : document.body.innerHTML;
            })()`)) as string;
            const pageUrl = ddbPage.url();
            await browser.disconnect();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ html, url: pageUrl }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }

        if (req.url?.startsWith("/api/browser/fetch-monster") || req.url?.startsWith("/api/brave/fetch-monster")) {
          const urlObj = new URL(req.url, "http://localhost:5173");
          const targetUrl = urlObj.searchParams.get("url");
          if (!targetUrl) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Missing url parameter" }));
            return;
          }

          // Tier A: Try Puppeteer connected to debugging port 9222
          try {
            const browser = await puppeteer.connect({ browserURL: "http://127.0.0.1:9222" });
            const pages = await browser.pages();
            const ddbPage = pages.find((p) => p.url().includes("dndbeyond.com")) || pages[0];
            const html = await ddbPage.evaluate(async (fetchTarget) => {
              const resp = await fetch(fetchTarget);
              return await resp.text();
            }, targetUrl);
            await browser.disconnect();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ html, url: targetUrl }));
            return;
          } catch {
            // Tier B: Fallback to direct server-side fetch via Node.js
            try {
              const resp = await fetch(targetUrl, {
                headers: {
                  "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                  "Accept-Language": "en-US,en;q=0.9",
                },
              });
              if (resp.ok) {
                const html = await resp.text();
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ html, url: targetUrl }));
                return;
              }
            } catch {}

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ html: null, url: targetUrl, error: "Browser bridge offline" }));
            return;
          }
        }

        if (req.url?.startsWith("/api/ddb-monsters")) {
          try {
            const targetPath = req.url.replace(/^\/api\/ddb-monsters/, "");
            const targetUrl = `https://www.dndbeyond.com${targetPath}`;
            const upstream = await fetch(targetUrl, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
              },
            });
            const body = await upstream.text();
            res.statusCode = upstream.status;
            res.setHeader(
              "Content-Type",
              upstream.headers.get("content-type") || "text/html; charset=utf-8",
            );
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(body);
            return;
          } catch (err: any) {
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (source: string, filename: string) => {
          if (filename.includes("src\\styles") || filename.includes("src/styles")) {
            return source;
          }
          return `@use "@/styles/index.scss" as *;\n${source}`;
        },
      },
    },
  },
  plugins: [
    react(),
    raw({
      match: /\.frag$/,
    }),
    combatBadgeAssetsPlugin(),
    browserBridgePlugin(),
  ],
  server: {
    headers: {
      "Cache-Control": "public, max-age=60",
    },
    cors: {
      origin: "https://www.owlbear.rodeo",
    },
    proxy: {
      "/api/ddb": {
        target: "https://character-service.dndbeyond.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ddb/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        background: resolve(import.meta.dirname, "background.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("monsters2024") || id.includes("monstersLegacy") || id.includes("srdMonsters")) {
            return "srd-monsters-data";
          }
          if (id.includes("effect_record.json")) {
            return "effect-record-data";
          }
          if (id.includes("node_modules/@mui") || id.includes("node_modules/@emotion")) {
            return "mui-vendor";
          }
        },
      },
    },
  },
});

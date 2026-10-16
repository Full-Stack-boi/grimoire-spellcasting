import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel Serverless Function — DDB Character API Proxy
 *
 * Forwards requests to the D&D Beyond character service API from server-side,
 * bypassing CORS restrictions that block browser-direct requests.
 *
 * Route: /api/ddb/:path*
 *   → https://character-service.dndbeyond.com/:path*
 *
 * Example:
 *   GET /api/ddb/character/v5/character/12345678
 *   → https://character-service.dndbeyond.com/character/v5/character/12345678
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.status(204).end();
        return;
    }

    const rawUrl = req.url ?? "";
    const isMonsterRequest = rawUrl.startsWith("/api/ddb-monsters");

    const targetUrl = isMonsterRequest
        ? `https://www.dndbeyond.com${rawUrl.replace(/^\/api\/ddb-monsters/, "")}`
        : `https://character-service.dndbeyond.com${rawUrl.replace(/^\/api\/ddb/, "")}`;

    const headers: Record<string, string> = isMonsterRequest
        ? {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        }
        : {
            Accept: "application/json",
        };

    try {
        const upstream = await fetch(targetUrl, { headers });
        const body = await upstream.text();
        const contentType =
            upstream.headers.get("content-type") ||
            (isMonsterRequest ? "text/html; charset=utf-8" : "application/json");

        res.status(upstream.status)
            .setHeader("Content-Type", contentType)
            .setHeader("Access-Control-Allow-Origin", "*")
            .send(body);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(502).json({ error: `Failed to reach D&D Beyond upstream: ${message}` });
    }
}

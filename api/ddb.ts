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
    // Strip the /api/ddb prefix to get the downstream path
    const ddbPath = (req.url ?? "").replace(/^\/api\/ddb/, "");
    const targetUrl = `https://character-service.dndbeyond.com${ddbPath}`;

    try {
        const upstream = await fetch(targetUrl, {
            headers: {
                Accept: "application/json",
            },
        });

        const body = await upstream.text();

        res.status(upstream.status)
            .setHeader("Content-Type", "application/json")
            .setHeader("Access-Control-Allow-Origin", "*")
            .send(body);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(502).json({ error: `Failed to reach D&D Beyond API: ${message}` });
    }
}

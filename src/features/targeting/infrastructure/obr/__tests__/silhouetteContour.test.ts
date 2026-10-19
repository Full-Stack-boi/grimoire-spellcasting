import { describe, it, expect, beforeEach } from "vitest";
import {
    extractImageContourCommands,
    clearContourCache,
    PathCommandType,
    prefetchTokenContour,
    prefetchSceneTokenContours,
    getCachedContourCommands,
} from "../silhouetteContour";

describe("extractImageContourCommands", () => {
    beforeEach(() => {
        clearContourCache();
    });

    it("returns fallback box commands when window/document is missing or image fails", async () => {
        const commands = await extractImageContourCommands(
            "https://invalid-url.example/test.png",
            100,
            100,
            { x: 50, y: 50 }
        );

        expect(commands).toBeDefined();
        expect(commands.length).toBeGreaterThan(0);
        expect(commands[0][0]).toBe(PathCommandType.MOVE);
        expect(commands[commands.length - 1][0]).toBe(PathCommandType.CLOSE);
    });

    it("caches results for identical parameters", async () => {
        const url = "https://example.com/token.png";
        const c1 = await extractImageContourCommands(url, 150, 150, { x: 75, y: 75 });
        const c2 = await extractImageContourCommands(url, 150, 150, { x: 75, y: 75 });
        expect(c1).toBe(c2);
    });

    it("prefetches token contour and stores in cache", async () => {
        const tokenItem = {
            id: "token-1",
            layer: "CHARACTER",
            visible: true,
            image: {
                url: "https://example.com/character.png",
                width: 150,
                height: 150,
            },
            grid: {
                dpi: 150,
                offset: { x: 75, y: 75 },
            },
        };

        prefetchTokenContour(tokenItem, 150);
        // Wait microtask for async load
        await new Promise((r) => setTimeout(r, 10));

        const cached = getCachedContourCommands("https://example.com/character.png", 150, 150, { x: 75, y: 75 });
        expect(cached).toBeDefined();
        expect(cached?.length).toBeGreaterThan(0);
    });

    it("prefetches all visible character tokens in scene safely", async () => {
        const sceneItems = [
            {
                id: "token-1",
                layer: "CHARACTER",
                visible: true,
                image: { url: "https://example.com/c1.png", width: 150, height: 150 },
            },
            {
                id: "token-2",
                layer: "CHARACTER",
                visible: false, // invisible, skipped
                image: { url: "https://example.com/c2.png", width: 150, height: 150 },
            },
            {
                id: "map-1",
                layer: "MAP", // map item, skipped
                image: { url: "https://example.com/map.png", width: 1000, height: 1000 },
            },
        ];

        prefetchSceneTokenContours(sceneItems, 150);
        await new Promise((r) => setTimeout(r, 10));

        const cached1 = getCachedContourCommands("https://example.com/c1.png", 150, 150, { x: 75, y: 75 });
        expect(cached1).toBeDefined();

        const cached2 = getCachedContourCommands("https://example.com/c2.png", 150, 150, { x: 75, y: 75 });
        expect(cached2).toBeNull();
    });
});


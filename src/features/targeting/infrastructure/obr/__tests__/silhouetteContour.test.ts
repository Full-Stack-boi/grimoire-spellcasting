import { describe, it, expect, beforeEach } from "vitest";
import { extractImageContourCommands, clearContourCache, PathCommandType } from "../silhouetteContour";

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
});

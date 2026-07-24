import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";

describe("GET /health", () => {
    let app: Awaited<ReturnType<typeof buildApp>> | undefined;

    afterEach(async () => {
        await app?.close();
    });

    it("returns the API health status", async () => {
        app = await buildApp({
            logger: false,
        });

        const response = await app.inject({
            method: "GET",
            url: "/health",
        });

        expect(response.statusCode).toBe(200);

        expect(response.json()).toMatchObject({
            status: "ok",
            timestamp: expect.any(String),
        });
    });
});
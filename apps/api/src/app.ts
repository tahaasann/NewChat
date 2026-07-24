import cors from "@fastify/cors";
import Fastify, { type FastifyInstance, type FastifyServerOptions, } from "fastify";

export async function buildApp(
    options: FastifyServerOptions = {},
): Promise<FastifyInstance> {
    const app = Fastify({
        logger: true,
        ...options,
    });

    await app.register(cors, {
        origin: "http://localhost:5173",
    });

    app.get("/health", async () => {
        return {
            status: "ok",
            timestamp: new Date().toISOString(),
        };
    });

    return app;
}
import { Hono } from "hono";
import { cors } from "hono/cors";
import { cache } from "hono/cache";
import { greeting, handleCorsProxy } from "./routes";
import { CACHE_CONFIG, CORS_CONFIG, poweredBy } from "./midlewares";

const app = new Hono();

// Middlewares
app.use("*", cors(CORS_CONFIG));
app.get("*", cache(CACHE_CONFIG));
app.use("*", poweredBy());

// Routes
app.all("/cors", handleCorsProxy());
app.all("*", greeting());

export default app;

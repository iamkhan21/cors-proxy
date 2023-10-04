import { MiddlewareHandler } from "hono";

export function poweredBy(): MiddlewareHandler {
  return async (c, next) => {
    await next();
    c.res.headers.set("X-Powered-By", "8byte.agency");
  };
}

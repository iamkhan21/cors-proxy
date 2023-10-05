import { Handler } from "hono";

export function handleCorsProxy(): Handler {
  return async (c) => {
    const targetUrl = c.req.query("target");

    if (!targetUrl) {
      return c.redirect(`/`);
    } else {
      const proxyHost = new URL(c.req.url).origin;
      const targetHost = new URL(targetUrl).origin;

      if (proxyHost === targetHost) {
        return c.text("Error: Self-targeting is not allowed.", 400);
      }
    }

    const response = await fetch(targetUrl, c.req);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  };
}

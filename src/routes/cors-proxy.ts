import { Handler } from "hono";

export function handleCorsProxy(): Handler {
  return async (c) => {
    const targetUrl = c.req.query("target");

    if (!targetUrl) {
      return c.html(`
      <section style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
        <h1>Welcome to the "CORS Proxy" service by 8byte.agency!</h1>
        <p>To use this service, append your target URL as a query parameter like so: ?target=YOUR_URL_HERE</p>
      </section>
    `);
    }

    const response = await fetch(targetUrl, c.req);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  };
}

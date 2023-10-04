import { Handler } from "hono";

export function handleCorsProxy(): Handler {
  return async (c) => {
    const targetUrl = c.req.query("target");

    if (!targetUrl) {
      return c.html(`
        <section
          style="
            font-size: 1.2rem;
            font-family: Arial, sans-serif;
            padding: 20px;
            text-align: center;
          "
        >
          <h3>Welcome to the "CORS Proxy" service!</h3>
          <p>
            To use this service, append your target URL as a query parameter like
            so:<br />
            <b> https://cors.iamkhan.tech/?target=YOUR_URL_HERE </b>
          </p>
          <footer>
            <small>
              Created by
              <a
                href="https://www.8byte.agency"
                target="_blank"
                rel="noopener noreferrer"
              >
                8byte Agency
              </a>
            </small>
          </footer>
        </section>
    `);
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

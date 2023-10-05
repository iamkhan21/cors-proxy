import { Handler } from "hono";

export function handleCorsProxy(): Handler {
  return async (c) => {
    const targetUrl = c.req.query("target");

    if (!targetUrl) {
      return c.redirect(`/`);
    }

    // Validate URL
    let targetHost;
    try {
      targetHost = new URL(targetUrl).origin;
    } catch (e) {
      return c.text("Error: Invalid URL.", 400);
    }

    const proxyHost = new URL(c.req.url).origin;

    if (proxyHost === targetHost) {
      return c.text("Error: Self-targeting is not allowed.", 400);
    }

    // Check for file extensions (this is a basic check, you can extend this list)
    const disallowedExtensions = [".php", ".exe", ".js"];
    for (let ext of disallowedExtensions) {
      if (targetUrl.endsWith(ext)) {
        return c.text(
          `Error: Fetching files with ${ext} extension is not allowed.`,
          400,
        );
      }
    }

    const response = await fetch(targetUrl, c.req);

    // Check Content-Type (this is a basic check, you can extend this list)
    const contentType = response.headers.get("Content-Type");
    if (
      contentType &&
      (contentType.startsWith("application/javascript") ||
        contentType.startsWith("application/php"))
    ) {
      return c.text(
        "Error: Fetching this type of content is not allowed.",
        400,
      );
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  };
}

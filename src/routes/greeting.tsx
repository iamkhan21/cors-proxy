import type { FC } from "hono/jsx";
import { Handler } from "hono";

const Greeting: FC = (props) => {
  return (
    <html>
      <head>
        <style>{`
            body {
                font-size: 1.2rem;
                font-family: Arial, sans-serif;
                margin: 0;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: #f4f4f4;
                color: #333;
            }

            main {
                padding: 4rem;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            h2 {
                margin-top: 0;
                color: #2c3e50;
            }

            p {
                margin-bottom: 2rem;
            }

            b {
                display: block;
                margin-top: 1rem;
                padding: 0.5rem;
                border: 1px dashed #3498db;
                color: #3498db;
            }

            mark {
                background-color: #3498db;
                color: #fff;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
            }

            footer {
                margin-top: 2rem;
            }

            a {
                color: #3498db;
                text-decoration: none;
                transition: color 0.3s;
            }

            a:hover {
                color: #2980b9;
            }
        `}</style>
      </head>
      <body>
        <main>
          <h2>Welcome to the "CORS Proxy"</h2>
          <p>
            To use this service, append your target URL as a query parameter
            like so:
            <b>
              https://cors.iamkhan.tech/cors?target=
              <mark>YOUR_URL_HERE</mark>
            </b>
          </p>
        </main>
        <footer>
          <small>
            Created by{" "}
            <a
              href="https://www.8byte.agency"
              target="_blank"
              rel="noopener noreferrer"
            >
              8byte Agency
            </a>
          </small>
        </footer>
      </body>
    </html>
  );
};

export function greeting(): Handler {
  return async (c) => {
    return c.html(<Greeting />);
  };
}

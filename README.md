# CORS Proxy

This is a simple proxy server built using the Hono framework. It can be used to overcome CORS issues during development by proxying requests to the target server. It has the ability to cache the server responses to improve performance, and also provides CORS preflight response capability.

## Getting Started

To use this service, append your target URL as a query parameter like so:  
https://cors.iamkhan.tech/cors?target={YOUR_URL_HERE}


## About This Project

This project uses the following technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [Hono](https://www.npmjs.com/package/hono)
- [Node.js](https://nodejs.org)

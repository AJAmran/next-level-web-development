import type { IncomingMessage, ServerResponse } from "node:http";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  if (url === "/products" && method === "GET") {
    const product = { id: 1, name: "Product -1" };
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Retrive Product Successfully", data: {product} }));
  }
};

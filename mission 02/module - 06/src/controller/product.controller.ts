import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async(
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  console.log(id);
  if (url === "/products" && method === "GET") {
    const product = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Retrive Product Successfully",
        data: { product },
      }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((product: IProduct) => product.id === id);
    res.end(
      JSON.stringify({
        message: "Retrive Product Successfully",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    console.log(body);
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product created Successfully",
        // data: { product },
      }),
    );
  }
};

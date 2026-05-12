import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url || "";
  const method = req.method || "";

  const urlParts = url.split("/");
  const isProductRoute = urlParts[1] === "products";

  const id = isProductRoute ? Number(urlParts[2]) : NaN;
  const hasValidId = !Number.isNaN(id);

  // GET ALL PRODUCTS
  if (url === "/products" && method === "GET") {
    const products = readProduct();

    return sendResponse(
      res,
      200,
      true,
      "Retrieve Products Successfully",
      products,
    );
  }

  // GET SINGLE PRODUCT
  if (method === "GET" && hasValidId) {
    const products = readProduct();

    const product = products.find((p: IProduct) => p.id === id);

    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }

    return sendResponse(
      res,
      200,
      true,
      "Retrieve Product Successfully",
      product,
    );
  }

  // CREATE PRODUCT
  if (url === "/products" && method === "POST") {
    const body = await parseBody(req);

    const products = readProduct();

    const newProduct = {
      id: Date.now(),
      ...body,
    };

    products.push(newProduct);

    insertProduct(products);

    return sendResponse(
      res,
      201,
      true,
      "Product created Successfully",
      newProduct,
    );
  }

  // UPDATE PRODUCT
  if (method === "PUT" && hasValidId) {
    const body = await parseBody(req);

    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      return sendResponse(res, 404, false, "Product not found");
    }

    products[index] = {
      ...products[index],
      ...body,
      id: products[index].id,
    };

    insertProduct(products);

    return sendResponse(
      res,
      200,
      true,
      "Product updated Successfully",
      products[index],
    );
  }

  // DELETE PRODUCT
  if (method === "DELETE" && hasValidId) {
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      return sendResponse(res, 404, false, "Product not found");
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    insertProduct(products);

    return sendResponse(
      res,
      200,
      true,
      "Product deleted Successfully",
      deletedProduct,
    );
  }

  return sendResponse(res, 404, false, "Route Not Found");
};

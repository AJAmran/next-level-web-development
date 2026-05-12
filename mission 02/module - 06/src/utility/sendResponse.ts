import type { ServerResponse } from "http";

export const sendResponse = (res: ServerResponse) => {
const response = 

  res.writeHead(404, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Product not found",
      data: { product },
    }),
  );
};

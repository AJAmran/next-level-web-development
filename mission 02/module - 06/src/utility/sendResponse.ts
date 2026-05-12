import type { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  success: boolean,
  message: string,
  data?: unknown,
) => {
  res.writeHead(statusCode, {
    "content-type": "application/json",
  });

  res.end(
    JSON.stringify({
      success,
      statusCode,
      message,
      data: data ?? null,
    }),
  );
};

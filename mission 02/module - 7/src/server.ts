import express, { type Request, type Response } from "express";
const app = express();
const port = 5000;

app.get("/user", (req: Request, res: Response) => {
  res.send("Hello World......!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

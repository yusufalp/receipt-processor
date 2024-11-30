import express from "express";

import receiptsRouter from "./routers/receiptsRouter.js";

const app = express();

app.use(express.json());

app.use("/receipts", receiptsRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(
    `The server is listening on port ${PORT}, http://localhost:${PORT}`
  );
});

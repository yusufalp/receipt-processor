import express from "express";

const app = express();

const PORT = 8080;

app.listen(PORT, () => {
  console.log(
    `The server is listening on port ${PORT}, http://localhost:${PORT}`
  );
});

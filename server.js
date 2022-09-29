import express from "express";
import categoriesRouter from "./routes/categoriesRoutes.js";

const server = express();

server.use(express.json());
server.use(categoriesRouter);

server.listen(4000, () => {
  console.log("listen on 4000");
});

import express from "express";
import categoriesRouter from "./routes/categoriesRoutes.js";
import gamesRouter from "./routes/gamesRoutes.js";
const server = express();

server.use(express.json());
server.use(categoriesRouter);
server.use(gamesRouter);

server.listen(4000, () => {
  console.log("listen on 4000");
});

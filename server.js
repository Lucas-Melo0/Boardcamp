import express from "express";
import categoriesRouter from "./routes/categoriesRoutes.js";
import gamesRouter from "./routes/gamesRoutes.js";
import costumerRouter from "./routes/customersRoutes.js";
const server = express();

server.use(express.json());
server.use(categoriesRouter);
server.use(gamesRouter);
server.use(costumerRouter);

server.listen(4000, () => {
  console.log("listen on 4000");
});

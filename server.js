import express from "express";
import cors from "cors";
import categoriesRouter from "./src/routes/categoriesRoutes.js";
import gamesRouter from "./src/routes/gamesRoutes.js";
import costumerRouter from "./src/routes/customersRoutes.js";
import rentalsRouter from "./src/routes/rentalsRoutes.js";
const server = express();

server.use(cors());
server.use(express.json());
server.use(categoriesRouter);
server.use(gamesRouter);
server.use(costumerRouter);
server.use(rentalsRouter);

server.listen(4000, () => {
  console.log("listen on 4000");
});

import express from "express";
import dotenv from "dotenv";
import pgk from "pg";

const { Pool } = pgk;
const server = express();
dotenv.config();
server.use(express.json());

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

server.listen(4000, () => {
  console.log("listen on 4000");
});

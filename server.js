import express from "express";

const server = express();

server.listen(4000, () => {
  console.log("listen on 4000");
});

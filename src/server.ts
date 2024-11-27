import "dotenv/config";
import express from "express";
import https from "https";
import fs from "fs";
import { router } from "./routes";
import "dotenv/config";
import cors from "cors";
// App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(router);

// Set port
const port: string | number = process.env.PORT || "3333";

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));

const options: any = {
  cert: fs.readFileSync(`${__dirname}/keys/code.crt`),
  key: fs.readFileSync(`${__dirname}/keys/code.key`),
};

https
  .createServer(
    options,
    //    (req, res) => {
    //   res.writeHead(200);
    //   res.end("Hello, HTTPS!");
    // }
    app
  )
  .listen(3001, () => {
    console.log("Server running on https://localhost:443");
  });

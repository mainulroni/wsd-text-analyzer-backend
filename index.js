import express from "express";
import { router } from "./src/router.js";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
//parse requests of content-type - application/json
app.use(express.json());
//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/v0/", router);

app.listen(process?.env?.PORT ? process.env.PORT : 8081, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${
      process?.env?.PORT ? process.env.PORT : 8081
    }/api/v0/health`
  );
});

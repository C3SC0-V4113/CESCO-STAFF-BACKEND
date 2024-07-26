import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/config";
import { routerAuth } from "./routes/auth";
import { routerClient } from "./routes/client";

dotenv.config();

/** Creating Express Server */
const app: Express = express();
const port = process.env.PORT;

/** Database */
dbConnection();

/** Public Directory */
app.use(express.static("public"));

/** Reading and parsing of body */
app.use(express.json());

/** Routes */
app.use("/api/auth", routerAuth);
app.use("/api/client", routerClient);

/** Listen Petitions */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

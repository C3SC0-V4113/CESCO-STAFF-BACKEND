import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/config";

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
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

/** Listen Petitions */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

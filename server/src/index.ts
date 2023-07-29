import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/index.routes";
import config from "config";
import log from "./utils/logger";
// import { executeAllCalls } from "../prisma/seed";
import { executeOneCall } from "../prisma/seed";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

const port = config.get<number>("port");

if (!port)
{
    console.log("Do not have a port to run on...");
    process.exit(1);
}

app.listen(port, async () =>
{
    // await executeAllCalls();
    await executeOneCall();
    log.info(`Now listening on port: ${port}`);
});
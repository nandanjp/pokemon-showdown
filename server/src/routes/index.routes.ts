import express from "express";
import log from "../utils/logger";

const router = express.Router();

router.get("/healthcheck", (_req, res) =>
{
    log.info("Successfully checked the health of the server!");
    return res.json({ message: "Successfully checked the health of the server!" });
});


export default router;
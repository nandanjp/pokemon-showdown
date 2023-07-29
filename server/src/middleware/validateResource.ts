import { NextFunction, Request, Response } from "express";
import log from "../utils/logger";
import { AnyZodObject } from "zod";

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        log.info("Successfully Validated Schema");
        return next();
    }
    catch (error: any)
    {
        log.error(error, "Error Validating Given Schema...");
        return res.send(400).json({ errors: error.errors });
    }
};

export default validateResource;
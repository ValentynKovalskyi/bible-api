import { NextFunction, Request, Response } from "express";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    console.error(error.stack);
    res.status(500).send({ error })
}
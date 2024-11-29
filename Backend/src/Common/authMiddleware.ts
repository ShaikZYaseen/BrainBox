import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

     //@ts-ignore
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET)
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}

// override the types of the express request object
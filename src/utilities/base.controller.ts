import {Request, Response, NextFunction} from "express";
import { IResponse } from "./_interfaces/utilities.interfaces";



// Base Controller wrapper...
class BaseController {
    protected wrapAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): (req: Request, res: Response, next: NextFunction) => Promise<void> {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await fn(req, res, next);
            } catch (error) {
                next(error);
            }
        };
    }

    protected sendResponse(res: Response, statusCode: number, data : IResponse): void {
        res.status(statusCode).json(data);
    }
}

export default BaseController;
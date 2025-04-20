import { Request, Response, NextFunction } from 'express';

function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>, cleanup?: () => Promise<void>){
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await fn(req, res, next);
        } catch(err) {
            console.log(err);
            res.status(500).send({ success: false, data: "Internal error" });
        } finally {
            cleanup && await cleanup();
        }
    };
}


export default asyncHandler;

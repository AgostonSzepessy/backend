import { NextFunction, Request, Response } from 'express';
import { MovnetError } from './MovnetError';
import { logger } from '../utils/logger';

export function errorHandler(error: MovnetError, req: Request, res: Response, next: NextFunction) {
    // Need this because (taken from express website)
    // If you call next() with an error after you have started writing the response
    // (for example, if you encounter an error while streaming the response to the client)
    // the Express default error handler closes the connection and fails the request.
    if(res.headersSent) {
        return next(error);
    }

    if(!(error instanceof MovnetError)) {
        next(error);
        return;
    }

    if(error.getDetails()) {
        res.status(error.getStatus()).json({
            success: false,
            status: error.getStatus(),
            message: error.getMessage(),
            details: error.getDetails(),
        });
    } else {
        res.status(error.getStatus()).json({
            success: false,
            status: error.getStatus(),
            message: error.getMessage(),
        });
    }
}

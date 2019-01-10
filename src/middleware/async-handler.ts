import express from 'express';

/**
 * Function that catches an Error from an async funtion call. Router functions don't
 * need to include try and catch if it's wrapped with this
 * @param fn Function that handles an Express.Request
 */
export const asyncHandler = (fn: express.RequestHandler) =>
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

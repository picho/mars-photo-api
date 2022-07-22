import {Request, Response, NextFunction} from 'express';
import Token from '../models/Token';

export default (req: Request, res: Response, next: NextFunction) => {    

    try {

        const token: Token = new Token();

        const authorizationToken = (req.headers.authorization !== undefined) ? req.headers.authorization.split(' ')[1] : "";

        if(authorizationToken === "")
            return res.status(401).json({
                message: "Unauthorized. Token not valid"
            });

        token.verifyToken(authorizationToken);

        next();
    }
    catch(error) {

        return res.status(418).json({
            message: 'Auth failed'
        });
    }
};


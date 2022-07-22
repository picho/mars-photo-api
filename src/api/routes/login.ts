import Express, { Router, Request, Response, NextFunction }  from "express";
import Token from "../models/Token";

const route: Router =  Express.Router();

route.get('/getToken/:username', (req: Request, res: Response, next:  NextFunction) => {

    const username : string = req.params.username;
    
    if(username === "")
        return res.status(400).json({
            message: 'You must give a username'
        });

    const token : Token = new Token();

    res.status(200).json({
        username,
        BearerToken: token.signToken(username)
    });
});

export = route;
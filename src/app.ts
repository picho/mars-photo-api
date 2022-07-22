import express, {Application, Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import fs from 'fs';

import imageRoutes from './api/routes/images';
import loginRoutes from './api/routes/login';

import { AppLogger } from './api/helper/appLogger';

const app: Application = express();

app.use(morgan('common', { stream: fs.createWriteStream('./log/accessLog/access.log', {flags: 'a'}) }));
app.use(morgan('dev'));

//For avoiding Cors problems
app.use((req: Request, res: Response, next: NextFunction) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }

    next();
});

//Routes that handle client requests 
app.use('/images', imageRoutes);
app.use('/login', loginRoutes);

//Handles not found routes
app.use((req: Request, res: Response, next: NextFunction) => {

    res.status(404);
    next(new Error('Route not found. Please, Check the the route name you want to call'));

});

//Handles aplication errors
app.use((error: any, req: Request, res: Response, next: NextFunction) => {

    res.status(error.status || 500)
    .json({
        error: {
            message: error.message
        }
    });
});

AppLogger.configureLogger();
AppLogger.info("info","Logger has been configured");

export = app;
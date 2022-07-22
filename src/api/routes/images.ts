import Express, { Router, Request, Response, NextFunction }  from "express";
import CheckToken from '../middlewares/checkToken';

import * as imagesController from '../controllers/images';

const route: Router =  Express.Router();

route.get('/:nombre', imagesController.get_test);

route.get('/:rover/photo', CheckToken, imagesController.get_images);

export = route;
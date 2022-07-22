import Express, { Router, Request, Response, NextFunction }  from "express";
import CheckToken from '../middlewares/checkToken';

import * as imagesController from '../controllers/images';

const route: Router =  Express.Router();

route.get('/', CheckToken, imagesController.get_images);

route.get('/:rover/photo', CheckToken, imagesController.get_image_by_name);

export = route;
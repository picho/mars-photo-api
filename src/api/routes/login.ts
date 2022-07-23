import Express, {Router} from 'express';

import * as loginController from '../controllers/login';

const route: Router =  Express.Router();

route.get('/getToken/:username', loginController.get_token);

export = route;
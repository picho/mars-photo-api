import { Console } from 'console';
import request from 'supertest';

import app from '../../app';

import Token from '../models/Token';

const token: Token = new Token();

const tokenValue = token.signToken('appTest');

describe("Testing image controler to get the images from Nasa's services", () => {
    
    it("Get images", () => {
        return request(app).get('/images/hola').expect(200);
    });

    it("Get /images/:rover/photo -> 401 Unauthorized", () => {

        return request(app).get('/images/curiosity/photo').expect(401);

    });

    it("Get /images/:rover/photo -> 404 Not Found ", () => {
        
        return request(app).get('/images/wrongRover/photo')
        .set('Authorization', `Bearer ${tokenValue}`)
        .expect(404);

    });

    it("Get /images/:rover/photo -> 404 No query params", () => {

        return request(app).get('/images/curiosity/photo')
        .set('Authorization', `Bearer ${tokenValue}`)
        .expect(404);
    });

});

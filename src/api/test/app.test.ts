import { Console } from 'console';
import { response } from 'express';
import { stringify } from 'querystring';
import request from 'supertest';

import app from '../../app';

import Token from '../models/Token';

const token: Token = new Token();

const tokenValue = token.signToken('appTest');
const solValue:  number = 1;
const solValueOutNumber: number = 9999999;
const pages: number = 1;


describe("Testing image controler to get the images from Nasa's services", () => {
    
    it("Get /images/:rover/photo -> Request without token -> 401 Unauthorized", () => {

        return request(app).get('/images/curiosity/photo').expect(401);

    });

    it("Get /images/:rover/photo -> Request witho wrong rover name -> 404 Not Found ", () => {
        
        return request(app).get('/images/wrongRover/photo')
        .set('Authorization', `Bearer ${tokenValue}`)
        .expect(404);

    });

    it("Get /images/:rover/photo -> 404 No query params", () => {

        return request(app).get('/images/curiosity/photo')
        .set('Authorization', `Bearer ${tokenValue}`)
        .expect(404);
    });

    it("Get /images/:rover/photo -> Request sending sol parameter -> 200 No query params", () => {

        return request(app).get('/images/curiosity/photo')
        .set('Authorization', `Bearer ${tokenValue}`)
        .query({
            sol: solValue
        })
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    photos: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            sol: expect.any(Number),
                            img_src: expect.any(String)
                        })
                    ])
                })
            );
        });
    });

    it("Get /images/:rover/photo -> Request sending page parameter -> 200 No query params", () => {

        return request(app).get('/images/curiosity/photo')
        .set('Authorization', `Bearer ${tokenValue}`)
        .query({
            sol: solValue,
            pages: pages
        })
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    photos: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            sol: expect.any(Number),
                            img_src: expect.any(String)
                        })
                    ])
                })
            );
        });
    });

    it("Get /images/:rover/photo -> Request sending page parameter -> 200 No query params", () => {

        return request(app).get('/images/curiosity/photo')
        .set('Authorization', `Bearer ${tokenValue}`)
        .query({
            sol: solValueOutNumber,
            pages: pages
        })
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    photos: expect.arrayContaining([])
                })
            );
        });
    });
});

describe("Testing login controler to get the app token for authenticating", () => {

    it("Get token -> Request sending username -> 200 Ok", () => {
        return request(app)
        .get('/login/getToken/appUsername')
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    username: expect.any(String),
                    BearerToken: expect.any(String)
                })
            );
        });
    });

    it("Get token -> Request sending no username -> 500 Internal Server Errpr", () => {
        
        return request(app).get('/login/getToken/')
        .expect(500)
        .then(response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    error: expect.objectContaining({
                        message: expect.any(String)
                    })
                })
            );
        });
    });
});
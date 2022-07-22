import { Request, Response, NextFunction }  from "express";
import congif from 'config';

import NasaRequest from "../models/NasaRequest";

import { getFlatParams } from "../helper/appHelper";
import { AppLogger } from '../helper/appLogger';

import NodeCache from 'node-cache';

const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

const roversAllowed: string[] = congif.get('roversAllowed');

export const get_images = (req: Request, res: Response, next:  NextFunction) => {

    myCache.set("hola","como");

    res.status(200).json({
        message: 'Get hola'
    });
}

export const get_image_by_name = async (req: Request, res: Response, next: NextFunction) => {

    if(req.query.sol === undefined)
        return res.status(404).json({
            message: 'param sol is required'
        });

    if(!checkRover(req.params.rover))
        return res.status(404).json({
            message: 'Invalid Rover Name, Please use a a correct rover',
            roversAllowed 
        });

    const rover: string = req.params.rover;

    const queryParams = {
        ...req.query
    }

    const flatedParams = getFlatParams(queryParams);

    const cachedData = myCache.get(flatedParams);
    
    if(cachedData !== undefined){

        AppLogger.info('cached Data', 'Data returned from cache');

        return  res.status(200).json({
            result: cachedData
        });
    }

    const nasaReques: NasaRequest = new NasaRequest(rover, queryParams);

    const {data} = await nasaReques.callExchangerValue();

    if(data === null)
        return res.status(400).json({
            message: 'Something wnet wrong. Please check the parameter' 
        });

    res.status(200).json({
        result: data.photos
    });

    myCache.set(flatedParams, data.photos);
}

const checkRover = (roverName: string): boolean => {
    return roversAllowed.includes(roverName.toUpperCase());
}
import { Request, Response, NextFunction }  from "express";
import NasaRequest from "../models/NasaRequest";
import congif from 'config';

const roversAllowed: string[] = congif.get('roversAllowed');

export const get_images = (req: Request, res: Response, next:  NextFunction) => {

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

    const nasaReques: NasaRequest = new NasaRequest(rover, queryParams);

    const {data} = await nasaReques.callExchangerValue();

    res.status(200).json({
        result: data.photos
    });
}

const checkRover = (roverName: string): boolean => {
    return roversAllowed.includes(roverName.toUpperCase());
}
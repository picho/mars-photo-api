"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_images = exports.get_test = void 0;
const config_1 = __importDefault(require("config"));
const NasaRequest_1 = __importDefault(require("../models/NasaRequest"));
const appHelper_1 = require("../helper/appHelper");
const appLogger_1 = require("../helper/appLogger");
const node_cache_1 = __importDefault(require("node-cache"));
const myCache = new node_cache_1.default({ stdTTL: 100, checkperiod: 120 });
const roversAllowed = config_1.default.get('roversAllowed');
const get_test = (req, res, next) => {
    myCache.set("hola", "como");
    res.status(200).json({
        message: 'Get hola'
    });
};
exports.get_test = get_test;
const get_images = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    appLogger_1.AppLogger.info('cached Data', 'Data returned from cache');
    if (req.query.sol === undefined)
        return res.status(404).json({
            message: 'param sol is required'
        });
    if (!checkRover(req.params.rover))
        return res.status(404).json({
            message: 'Invalid Rover Name, Please use a a correct rover',
            roversAllowed
        });
    const rover = req.params.rover;
    const queryParams = Object.assign({}, req.query);
    const flatedParams = (0, appHelper_1.getFlatParams)(queryParams);
    const cachedData = myCache.get(flatedParams);
    if (cachedData !== undefined) {
        appLogger_1.AppLogger.info('cached Data', 'Data returned from cache');
        return res.status(200).json({
            result: cachedData
        });
    }
    const nasaReques = new NasaRequest_1.default(rover, queryParams);
    const { data } = yield nasaReques.callExchangerValue();
    if (data === null)
        return res.status(400).json({
            message: 'Something wnet wrong. Please check the parameter'
        });
    res.status(200).json({
        result: data.photos
    });
    myCache.set(flatedParams, data.photos);
});
exports.get_images = get_images;
const checkRover = (roverName) => {
    return roversAllowed.includes(roverName.toUpperCase());
};

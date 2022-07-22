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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
const appLogger_1 = require("../helper/appLogger");
class NasaRequest {
    constructor(rover, queryParams) {
        this.nasaKey = config_1.default.get('nasaPrivateKey');
        this.nasaBaseUrl = config_1.default.get('nasaBaseUrl');
        this.rover = rover;
        this.queryParams = queryParams;
    }
    ;
    ;
    // Método
    callExchangerValue() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = null;
            let finalUrl = `${this.nasaBaseUrl}${this.rover}/photos`;
            finalUrl = this.addUrlParams(finalUrl);
            appLogger_1.AppLogger.info('Nasa URl value', finalUrl);
            try {
                result = yield axios_1.default.get(finalUrl);
            }
            catch (error) {
                appLogger_1.AppLogger.error('Error callling Nasa service', JSON.stringify(error));
                result = {
                    data: null
                };
            }
            return result;
        });
    }
    addUrlParams(finalUrl) {
        for (let param in this.queryParams)
            finalUrl += `?${param}=${this.queryParams[param]}&`;
        return finalUrl += `api_key=${this.nasaKey}`;
    }
}
exports.default = NasaRequest;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlatParams = void 0;
function getFlatParams(params) {
    let flatedParams = "";
    for (let param in params)
        flatedParams += `?${param}=${params[param]}&`;
    return flatedParams;
}
exports.getFlatParams = getFlatParams;

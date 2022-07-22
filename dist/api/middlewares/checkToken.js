"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = __importDefault(require("../models/Token"));
exports.default = (req, res, next) => {
    try {
        const token = new Token_1.default();
        const authorizationToken = (req.headers.authorization !== undefined) ? req.headers.authorization.split(' ')[1] : "";
        if (authorizationToken === "")
            return res.status(401).json({
                message: "Unauthorized. Token not valid"
            });
        token.verifyToken(authorizationToken);
        next();
    }
    catch (error) {
        return res.status(418).json({
            message: 'Auth failed'
        });
    }
};

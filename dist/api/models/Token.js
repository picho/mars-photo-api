"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
class Token {
    constructor() {
        this.appPrivateKey = config_1.default.get('appPrivateKey');
        this.tokenDuration = config_1.default.get('token.tokenDuration');
    }
    signToken(username) {
        const payload = {
            username
        };
        const signInOptions = {
            expiresIn: this.tokenDuration
        };
        return jsonwebtoken_1.default.sign(payload, this.appPrivateKey, signInOptions);
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.appPrivateKey);
    }
}
exports.default = Token;

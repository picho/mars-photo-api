"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Token_1 = __importDefault(require("../models/Token"));
const route = express_1.default.Router();
route.get('/getToken/:username', (req, res, next) => {
    const username = req.params.username;
    if (username === "")
        return res.status(400).json({
            message: 'You must give a username'
        });
    const token = new Token_1.default();
    res.status(200).json({
        username,
        BearerToken: token.signToken(username)
    });
});
module.exports = route;

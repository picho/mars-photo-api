"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const images_1 = __importDefault(require("./api/routes/images"));
const login_1 = __importDefault(require("./api/routes/login"));
const appLogger_1 = require("./api/helper/appLogger");
const app = (0, express_1.default)();
appLogger_1.AppLogger.configureLogger();
appLogger_1.AppLogger.info("info", "Logger has been configured");
app.use((0, morgan_1.default)('common', { stream: fs_1.default.createWriteStream('./log/accessLog/access.log', { flags: 'a' }) }));
app.use((0, morgan_1.default)('dev'));
//For avoiding Cors problems
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    next();
});
//Routes that handle client requests 
app.use('/images', images_1.default);
app.use('/login', login_1.default);
//Handles not found routes
app.use((req, res, next) => {
    res.status(404);
    next(new Error('Route not found. Please, Check the the route name you want to call'));
});
//Handles aplication errors
app.use((error, req, res, next) => {
    appLogger_1.AppLogger.error("General Error", error);
    res.status(error.status || 500)
        .json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;

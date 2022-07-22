"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("config"));
const envPort = parseInt(config_1.default.get('server.port') || '');
const port = Number.isInteger(envPort) ? envPort : 5000;
const server = http_1.default.createServer(app_1.default);
server.listen(port, () => console.log(`Server is running at port ${port}`));

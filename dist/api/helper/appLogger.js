"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const winston_1 = require("winston");
const path = require("path");
require("winston-daily-rotate-file");
class AppLogger {
    static SetLogger() {
        const logFormat = winston_1.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        });
        this.logger = (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.json(), winston_1.format.timestamp(), logFormat),
            transports: [
                new winston_1.transports.DailyRotateFile({
                    filename: path.join(AppLogger.logDirectory, "log-%DATE%.log"),
                    datePattern: "YYYY-MM-DD",
                    maxSize: "1g",
                    level: "verbose",
                }),
            ],
            exitOnError: false,
        });
    }
    static configureLogger() {
        this.SetLogger();
    }
    static GetValue(name, value) {
        if (typeof value === "string") {
            return `${name}-  ${value}`;
        }
        else {
            return `${name}-${JSON.stringify(value)}`;
        }
    }
    static debug(name, value) {
        this.logger.log("debug", this.GetValue(name, value));
    }
    static error(name, value) {
        this.logger.log("error", this.GetValue(name, value));
    }
    static warn(name, value) {
        this.logger.log("warn", this.GetValue(name, value));
    }
    static info(name, value) {
        this.logger.log("info", this.GetValue(name, value));
    }
}
exports.AppLogger = AppLogger;
AppLogger.logDirectory = "./log/statusLog";

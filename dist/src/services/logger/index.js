"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const pino_1 = __importDefault(require("pino"));
/**
 * a single location to manage logging throughout the app
 */
class _Logger {
    constructor() {
        this._logger = null;
        this.info = (msg, req) => {
            // TODO: add logging to log service
            const mergingObject = {};
            this._logger.info(mergingObject, msg);
        };
        this.error = (err, req) => {
            // TODO: add logging to log service
            const mergingObject = {
                errorType: `${err.data.name} Error`,
            };
            this._logger.error(mergingObject, err.message);
        };
        this._logger = (0, pino_1.default)();
        // TODO: add logging service config
    }
}
exports.Logger = new _Logger();

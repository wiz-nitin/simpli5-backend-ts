"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _404_1 = __importDefault(require("./404"));
const user_1 = __importDefault(require("./user"));
const supportTicket_1 = __importDefault(require("./supportTicket"));
const routers = (app) => {
    (0, user_1.default)(app);
    (0, supportTicket_1.default)(app);
    // notFound is a catch all and should be last
    (0, _404_1.default)(app);
    return app;
};
exports.default = routers;

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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongo_1 = require("./src/clients/mongo");
const routers_1 = __importDefault(require("./src/routers"));
const errorHandler_1 = __importDefault(require("./src/middleware/errorHandler"));
const cors_1 = __importDefault(require("./src/middleware/cors"));
const identify_1 = __importDefault(require("./src/middleware/identify"));
const port = process.env.PORT || 3000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    yield mongo_1.MongoClient.init();
    app.use((0, cors_1.default)());
    app.use(identify_1.default);
    app.use(express_1.default.urlencoded({ extended: true })); // temp workaround for broken types with express typings
    app.use(express_1.default.json({ limit: `${100 * 1024 * 1024}mb` })); // temp workaround for broken types with express typings { limit: `${100 * 1024 * 1024}mb` }
    app.listen(port, () => {
        console.log('\n --------------------------\n', `| Listening on port ${port} |`, '\n --------------------------');
        console.log(' --------------------------\n', `|   Process id ${process.pid}     |`, '\n --------------------------\n');
    });
    app.use(errorHandler_1.default);
    (0, routers_1.default)(app);
}))();

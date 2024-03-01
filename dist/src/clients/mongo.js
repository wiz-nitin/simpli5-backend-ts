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
exports.MongoClient = exports._MongoClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionClient_1 = require("./connectionClient");
const { DB_USER, DB_NAME, DB_PASS, DB_URL, } = process.env;
class _MongoClient extends connectionClient_1.ConnectionClient {
    constructor() {
        super('Mongo');
        this._db = null;
        this._connect = () => __awaiter(this, void 0, void 0, function* () {
            const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.txowmvz.mongodb.net/`;
            mongoose_1.default.connection.on('error', (err) => {
                console.log(err);
            });
            mongoose_1.default.connection.on('disconnected', () => {
                console.log(`Disconnected from${!!DB_URL ? '' : ' local'} MongoDB`);
            });
            mongoose_1.default.connection.on('connected', () => {
                console.log(`\nConnected successfully to${!!DB_URL ? '' : ' local'} MongoDB`);
            });
            this._db = yield mongoose_1.default.connect(mongoUri);
        });
        this.disconnect = () => {
            var _a;
            console.log('disconnecting from MongoDB...');
            (_a = this._db) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
    }
}
exports._MongoClient = _MongoClient;
exports.MongoClient = new _MongoClient();

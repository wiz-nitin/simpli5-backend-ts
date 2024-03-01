"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionClient = void 0;
class ConnectionClient {
    constructor(n) {
        this.init = () => {
            if (!this._connectionPromise)
                this._connectionPromise = this._connect();
            return this._connectionPromise;
        };
        this.name = n;
    }
}
exports.ConnectionClient = ConnectionClient;

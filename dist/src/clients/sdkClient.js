"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdkClient = void 0;
class SdkClient {
    constructor(n) {
        this.name = n;
        this._init = this._init.bind(this);
        this._init();
    }
}
exports.SdkClient = SdkClient;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../lib/constants");
const output_1 = require("../services/output");
const customError_1 = __importDefault(require("../lib/customError"));
const router = (0, express_1.Router)();
const sendNotFound = (req, res) => (0, output_1.error)(req, res, new customError_1.default(`Method ${req.method} for path ${req.originalUrl} not found`, constants_1.ErrorTypes.NOT_FOUND));
router.get('*', sendNotFound);
router.post('*', sendNotFound);
router.put('*', sendNotFound);
router.patch('*', sendNotFound);
router.delete('*', sendNotFound);
exports.default = (app) => app.use('/', router);

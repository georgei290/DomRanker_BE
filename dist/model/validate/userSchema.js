"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Validation Schema for userModel
const userSchema = {
    registerUser: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        status: joi_1.default.string().required(),
        token: joi_1.default.string().required(),
        verified: joi_1.default.boolean().required(),
    }),
    loginUser: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
    }),
};
exports.default = userSchema;

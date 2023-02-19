"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const userSchema_1 = __importDefault(require("./userSchema"));
const validate_1 = __importDefault(require("./validate"));
// creating the input Validation middleware functions
const registerValidation = (req, res, next) => {
    (0, validate_1.default)(userSchema_1.default.registerUser, req.body, next);
};
exports.registerValidation = registerValidation;
const loginValidation = (req, res, next) => {
    (0, validate_1.default)(userSchema_1.default.loginUser, req.body, next);
};
exports.loginValidation = loginValidation;

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
exports.authService = void 0;
const auth_utils_1 = require("./auth.utils");
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = __importDefault(require("../../Errors/AppErrors"));
const user_model_1 = require("../User/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const user = yield user_model_1.User.findOne({ email });
    if (user) {
        throw new AppErrors_1.default(http_status_1.default.BAD_REQUEST, "User already exist");
    }
    const result = yield user_model_1.User.create([payload], { new: true });
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.User.findOne({ email }).select("+password");
    if (!user) {
        throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const passwordMatched = yield (0, auth_utils_1.isPasswordMatched)(password, user.password);
    if (!passwordMatched)
        throw new Error("Password not matched");
    const jwtPayload = {
        id: user._id,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_token, {
        expiresIn: "1d",
    });
    user.password = "";
    return { accessToken, user };
});
exports.authService = {
    signUp,
    login,
};

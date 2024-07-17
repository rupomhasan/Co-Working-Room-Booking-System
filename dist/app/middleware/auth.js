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
exports.auth = void 0;
const catchAsync_1 = __importDefault(require("../Utils/catchAsync"));
const AppErrors_1 = __importDefault(require("../Errors/AppErrors"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../Modules/User/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new AppErrors_1.default(http_status_1.default.UNAUTHORIZED, "Your not authorized");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token);
        const { role, id } = decoded;
        const user = yield user_model_1.User.findById(id);
        if (!user)
            throw new AppErrors_1.default(http_status_1.default.NOT_FOUND, "User is not found");
        if (!requiredRoles.includes(role))
            throw new AppErrors_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to access this route");
        req.id = id;
        next();
    }));
};
exports.auth = auth;

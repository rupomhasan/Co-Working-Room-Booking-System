"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const route_1 = require("./app/Routes/route");
const notFoundRoute_1 = __importDefault(require("./app/middleware/notFoundRoute"));
const globalErrorhandler_1 = require("./app/middleware/globalErrorhandler");
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", route_1.router);
app.get("/", (req, res) => {
    res.send("hello world");
});
app.use(globalErrorhandler_1.globalErrorHandler);
app.use(notFoundRoute_1.default);
exports.default = app;

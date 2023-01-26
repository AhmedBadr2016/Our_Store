"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader !== undefined) {
            const token = authorizationHeader.split(" ")[1];
            console.log(token);
            jsonwebtoken_1.default.verify(token, config_1.default.tokensecret);
            next();
        }
        else {
            res.status(401).send(`Not authenticated`);
        }
    }
    catch (error) {
        res.status(401);
    }
};
exports.default = verifyAuthToken;

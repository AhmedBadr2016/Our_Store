"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_methods_1 = require("../models/user_methods");
const our_user_main = new user_methods_1.userStore();
const verifyAuthToken = async (req, res, next) => {
    try {
        const new_user = await our_user_main.authenticate(req.body.email, req.body.password);
        console.log(new_user);
        const token_1 = jsonwebtoken_1.default.sign({ new_user }, config_1.default.tokensecret);
        console.log(`The token_1: ${token_1}`);
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        console.log(`------------`);
        console.log(`The token: ${token}`);
        console.log(`------------`);
        jsonwebtoken_1.default.verify(token, config_1.default.tokensecret);
        console.log(`The token_1 is verified`);
        next();
    }
    catch (error) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
};
exports.default = verifyAuthToken;

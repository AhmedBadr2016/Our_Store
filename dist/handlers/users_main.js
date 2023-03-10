"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_methods_1 = require("../models/user_methods");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const validation_1 = __importDefault(require("../validation/validation"));
const our_user_main = new user_methods_1.userStore();
const users_handler = (app) => {
    app.get("/users", validation_1.default, index);
    app.get("/user/:email", validation_1.default, show);
    app.post("/user/sign_up", create);
    app.post("/user/sign_in", authenticate);
    app.patch("/user/edit/:email", validation_1.default, update);
    app.delete("/user/delete/:email", validation_1.default, destroy);
};
const index = async (_req, res) => {
    const new_user = await our_user_main.index();
    if (new_user) {
        return res.json({
            status: 200,
            data: { ...new_user },
            message: `user authenticated successfully`,
        });
    }
    else {
        return res.json({
            status: 401,
            message: `No products in that order`,
        });
    }
};
const show = async (req, res) => {
    const new_user = await our_user_main.show(req.params.email);
    if (new_user) {
        return res.json({
            status: 200,
            data: { ...new_user },
            message: `user authenticated successfully`,
        });
    }
    else {
        return res.json({
            status: 401,
            message: `No products in that order`,
        });
    }
};
const create = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        };
        console.log("Sign up new user");
        const new_user = await our_user_main.create(user);
        if (new_user !== null) {
            // res.json(new_user);
            const token = jsonwebtoken_1.default.sign({ new_user }, config_1.default.tokensecret);
            return res.json({
                status: 200,
                data: { ...new_user, token },
                message: `user authenticated successfully`,
            });
        }
        else {
            res
                .status(404)
                .send(`The user is exist in database. Please try again or go to: http://localhost:3000/user/sign_in and sign in and enter the email & password in the body`);
            console.log(`The user is not exist. Please go to: http://localhost:3000/user/sign_in and sign in and enter the email & password in the body`);
        }
    }
    catch (err) {
        res.status(400);
        res.json(`Go to http://localhost:3000/user/sign_in. Error: ${err}`);
    }
};
const authenticate = async (req, res) => {
    try {
        console.log("sign in a Client");
        const new_user = await our_user_main.authenticate(req.body.email, req.body.password);
        if (new_user !== null) {
            // res.json(new_user);
            const token = jsonwebtoken_1.default.sign({ new_user }, config_1.default.tokensecret);
            return res.json({
                status: 200,
                data: { ...new_user, token },
                message: `user authenticated successfully`,
            });
        }
        else {
            res
                .status(404)
                .send(`The user and password don't match. Please try again or go to: http://localhost:3000/user/sign_up and create new user and enter the first_name & last_name & email & username & password in the body`);
            console.log(`The user is not exist. Please go to: http://localhost:3000/user/sign_up and create new user and enter the first_name & last_name & email & username & password in the body`);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        };
        const new_user = await our_user_main.update(user);
        if (new_user) {
            return res.json({
                status: 200,
                data: { ...new_user },
                message: `user authenticated successfully`,
            });
        }
        else {
            return res.json({
                status: 401,
                message: `No products in that order`,
            });
        }
    }
    catch (err) {
        res
            .status(400)
            .send(`Token required- email & the value which needed to be updated`);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const new_user = await our_user_main.delete(req.params.email);
    if (new_user) {
        return res.json({
            status: 200,
            data: { ...new_user },
            message: `user authenticated successfully`,
        });
    }
    else {
        return res.json({
            status: 401,
            message: `No products in that order`,
        });
    }
};
exports.default = users_handler;

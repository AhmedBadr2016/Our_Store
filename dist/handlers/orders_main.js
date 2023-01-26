"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_methods_1 = __importDefault(require("../models/order_methods"));
const validation_1 = __importDefault(require("../validation/validation"));
const our_order_main = new order_methods_1.default();
const index = async (_req, res) => {
    try {
        const new_order = await our_order_main.get_all_orders();
        if (new_order) {
            return res.json({
                status: 200,
                data: { ...new_order },
                message: `order authenticated successfully`,
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
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    const order = {
        id: req.body.order_id,
        status: req.body.status,
        user_id: req.body.user_id,
    };
    try {
        const new_order = await our_order_main.get_specific_order(order.id);
        if (new_order) {
            return res.json({
                status: 200,
                data: { ...new_order },
                message: `order authenticated successfully`,
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
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const order = {
        status: req.body.status,
        user_id: req.body.user_id,
    };
    if (order.status == "active") {
        try {
            const new_order = await our_order_main.create(order);
            return res.json({
                status: 200,
                data: { ...new_order },
                message: `order authenticated successfully`,
            });
        }
        catch (err) {
            res.status(401);
            res.json(`Access denied, invalid token ${err}`);
            return;
        }
    }
    else if (order.status == "complete") {
        try {
            const new_order = await our_order_main.create(order);
            return res.json({
                status: 200,
                data: { ...new_order },
                message: `order authenticated successfully`,
            });
        }
        catch (err) {
            res.status(401);
            res.json(`Access denied, invalid token ${err}`);
            return;
        }
    }
    else {
        res
            .status(404)
            .send(`The order and password don't match. Please try again or go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
        console.log(`The order is not exist. Please go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
    }
};
const update = async (req, res) => {
    try {
        const order = {
            id: req.body.id,
            status: req.body.status,
            user_id: req.body.id,
        };
        const new_order = await our_order_main.update_order(order);
        if (new_order) {
            return res.json({
                status: 200,
                data: { ...new_order },
                message: `order authenticated successfully`,
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
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const new_order = await our_order_main.delete(req.params.id);
    if (new_order) {
        return res.json({
            status: 200,
            data: { ...new_order },
            message: `order authenticated successfully`,
        });
    }
    else {
        return res.json({
            status: 401,
            message: `No products in that order`,
        });
    }
};
const orders_handler = (app) => {
    app.get("/user/sign_in/orders", validation_1.default, index);
    app.get("/user/sign_in/order/:id", validation_1.default, show);
    app.post("/user/sign_in/order", validation_1.default, create);
    app.patch("/user/sign_in/order/edit/:id", validation_1.default, update);
    app.delete("/user/sign_in/order/delete/:id", validation_1.default, destroy);
};
exports.default = orders_handler;

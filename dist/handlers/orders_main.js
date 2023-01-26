"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_methods_1 = __importDefault(require("../models/order_methods"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const our_order_main = new order_methods_1.default();
const index = async (_req, res) => {
    const new_order = await our_order_main.get_all_orders();
    if (new_order !== null) {
        // res.json(new_order);
        const token = jsonwebtoken_1.default.sign({ new_order }, config_1.default.tokensecret);
        return res.json({
            status: 200,
            data: { ...new_order, token },
            message: `order authenticated successfully`,
        });
    }
    else {
        res
            .status(404)
            .send(`The order and password don't match. Please try again or go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
        console.log(`The order is not exist. Please go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
    }
};
const show = async (req, res) => {
    const new_order = await our_order_main.get_specific_order(req.body.id);
    if (new_order !== null) {
        // res.json(new_order);
        const token = jsonwebtoken_1.default.sign({ new_order }, config_1.default.tokensecret);
        return res.json({
            status: 200,
            data: { ...new_order, token },
            message: `order authenticated successfully`,
        });
    }
    else {
        res
            .status(404)
            .send(`The order and password don't match. Please try again or go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
        console.log(`The order is not exist. Please go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            status: req.body.status,
            user_id: req.body.user_id,
        };
        if (order.status == "active") {
            const new_order = await our_order_main.create(order);
            if (new_order !== null) {
                // res.json(new_order);
                const token = jsonwebtoken_1.default.sign({ new_order }, config_1.default.tokensecret);
                return res.json({
                    status: 200,
                    data: { ...new_order, token },
                    message: `order authenticated successfully`,
                });
            }
            else {
                res
                    .status(404)
                    .send(`The order and password don't match. Please try again or go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
                console.log(`The order is not exist. Please go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
            }
        }
        else if (order.status == "complete") {
            const new_order = await our_order_main.create(order);
            if (new_order !== null) {
                // res.json(new_order);
                const token = jsonwebtoken_1.default.sign({ new_order }, config_1.default.tokensecret);
                return res.json({
                    status: 200,
                    data: { ...new_order, token },
                    message: `order authenticated successfully`,
                });
            }
            else {
                res
                    .status(404)
                    .send(`The order and password don't match. Please try again or go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
                console.log(`The order is not exist. Please go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
            }
        }
        else {
            res
                .status(400)
                .send(`Please enter the status between [active or complete] ?`);
        }
    }
    catch (err) {
        res.status(400).send(`The status in the body should be active or complete`);
        res.json(err);
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
        if (new_order !== null) {
            // res.json(new_order);
            const token = jsonwebtoken_1.default.sign({ new_order }, config_1.default.tokensecret);
            return res.json({
                status: 200,
                data: { ...new_order, token },
                message: `order authenticated successfully`,
            });
        }
        else {
            res
                .status(404)
                .send(`The order and password don't match. Please try again or go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
            console.log(`The order is not exist. Please go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const new_order = await our_order_main.delete(req.params.id);
    if (new_order !== null) {
        // res.json(new_order);
        const token = jsonwebtoken_1.default.sign({ new_order }, config_1.default.tokensecret);
        return res.json({
            status: 200,
            data: { ...new_order, token },
            message: `order authenticated successfully`,
        });
    }
    else {
        res
            .status(404)
            .send(`The order and password don't match. Please try again or go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
        console.log(`The order is not exist. Please go to: http://localhost:3000/order/sign_up and create new order and enter the first_name & last_name & email & ordername & password in the body`);
    }
};
const orders_handler = (app) => {
    app.get("/user/sign_in/orders", index);
    app.get("/user/sign_in/order/:id", show);
    app.post("/user/sign_in/order", create);
    app.patch("/user/sign_in/order/edit/:id", update);
    app.delete("/user/sign_in/order/delete/:id", destroy);
};
exports.default = orders_handler;

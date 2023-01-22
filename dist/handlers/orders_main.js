"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_methods_1 = __importDefault(require("../models/order_methods"));
const our_order_main = new order_methods_1.default();
const index = async (_req, res) => {
    const output_all = await our_order_main.get_all_orders();
    res.json(output_all);
};
const show = async (req, res) => {
    const output_one = await our_order_main.get_specific_order(req.body.id);
    res.json(output_one);
};
const create = async (req, res) => {
    try {
        const order = {
            status: req.body.status,
            user_id: req.body.user_id,
        };
        if (order.status == "active") {
            const new_order = await our_order_main.create(order);
            res.json(new_order);
        }
        else if (order.status == "complete") {
            const new_order = await our_order_main.create(order);
            res.json(new_order);
        }
        else {
            res.status(400);
            res.json(Error);
        }
    }
    catch (err) {
        res.status(400);
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
        res.json(new_order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await our_order_main.delete(req.params.id);
    res.json(deleted);
};
const orders_handler = (app) => {
    app.get("/user/sign_in/orders", index);
    app.get("/user/sign_in/order/:id", show);
    app.post("/user/sign_in/order", create);
    app.patch("/user/sign_in/order/edit/:id", update);
    app.delete("/user/sign_in/order/delete/:id", destroy);
};
exports.default = orders_handler;

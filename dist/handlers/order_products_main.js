"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_methods_1 = __importDefault(require("../models/order_product_methods"));
const validation_1 = __importDefault(require("../validation/validation"));
const our_order_product_main = new order_product_methods_1.default();
const index = async (_req, res) => {
    try {
        const new_product = await our_order_product_main.get_all_order_products();
        if (new_product !== null) {
            return res.json({
                status: 200,
                data: { ...new_product },
                message: `product authenticated successfully`,
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
        res.status(400).send(`can't add products to card`);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const new_product = await our_order_product_main.get_specific_order_product(req.body.order_id);
        if (new_product !== null) {
            return res.json({
                status: 200,
                data: { ...new_product },
                message: `product authenticated successfully`,
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
        res.status(400).send(`can't add products to card`);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const order_product = {
            id: req.body.id,
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        if (order_product) {
            const new_product = await our_order_product_main.create(order_product);
            return res.json({
                status: 200,
                data: { ...new_product },
                message: `product authenticated successfully`,
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
const update = async (req, res) => {
    try {
        const order_product = {
            id: req.body.id,
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        if (order_product) {
            const new_product = await our_order_product_main.update_order_product(order_product);
            return res.json({
                status: 200,
                data: { ...new_product },
                message: `product authenticated successfully`,
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
    try {
        const new_product = await our_order_product_main.delete(req.params.id);
        if (new_product) {
            return res.json({
                status: 200,
                data: { ...new_product },
                message: `product authenticated successfully`,
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
        res.status(400).send(`can't add products to card`);
        res.json(err);
    }
};
const addProduct = async (_req, res) => {
    const op = {
        order_id: _req.body.order_id,
        product_id: _req.body.product_id,
        quantity: _req.body.quantity,
    };
    try {
        const new_product = await our_order_product_main.addProduct(op);
        if (new_product !== null) {
            return res.json({
                status: 200,
                data: { ...new_product },
                message: `product authenticated successfully`,
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
        res.status(400).send(`can't add products to card`);
        res.json(err);
    }
};
const order_products_handler = (app) => {
    app.get("/order_products", validation_1.default, index);
    app.get("/order_product/:id", validation_1.default, show);
    app.post("/order_product/create", validation_1.default, create);
    app.patch("/order_product/edit/:id", validation_1.default, update);
    app.delete("/order_product/delete/:id", validation_1.default, destroy);
    app.post("/user/sign_in/order/:id/products", validation_1.default, addProduct);
};
exports.default = order_products_handler;

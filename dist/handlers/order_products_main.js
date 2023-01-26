"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_methods_1 = __importDefault(require("../models/order_product_methods"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const our_order_product_main = new order_product_methods_1.default();
const index = async (_req, res) => {
    const new_product = await our_order_product_main.get_all_order_products();
    if (new_product !== null) {
        // res.json(new_product);
        const token = jsonwebtoken_1.default.sign({ new_product }, config_1.default.tokensecret);
        return res.json({
            status: 200,
            data: { ...new_product, token },
            message: `product authenticated successfully`,
        });
    }
    else {
        res
            .status(404)
            .send(`The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
        console.log(`The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
    }
};
const show = async (req, res) => {
    const new_product = await our_order_product_main.get_specific_order_product(req.body.order_id);
    if (new_product !== null) {
        // res.json(new_product);
        const token = jsonwebtoken_1.default.sign({ new_product }, config_1.default.tokensecret);
        return res.json({
            status: 200,
            data: { ...new_product, token },
            message: `product authenticated successfully`,
        });
    }
    else {
        res
            .status(404)
            .send(`The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
        console.log(`The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
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
        const new_product = await our_order_product_main.create(order_product);
        if (new_product !== null) {
            // res.json(new_product);
            const token = jsonwebtoken_1.default.sign({ new_product }, config_1.default.tokensecret);
            return res.json({
                status: 200,
                data: { ...new_product, token },
                message: `product authenticated successfully`,
            });
        }
        else {
            res
                .status(404)
                .send(`The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
            console.log(`The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
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
        const new_product = await our_order_product_main.update_order_product(order_product);
        if (new_product !== null) {
            // res.json(new_product);
            const token = jsonwebtoken_1.default.sign({ new_product }, config_1.default.tokensecret);
            return res.json({
                status: 200,
                data: { ...new_product, token },
                message: `product authenticated successfully`,
            });
        }
        else {
            res
                .status(404)
                .send(`The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
            console.log(`The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const new_product = await our_order_product_main.delete(req.params.id);
    if (new_product !== null) {
        // res.json(new_product);
        const token = jsonwebtoken_1.default.sign({ new_product }, config_1.default.tokensecret);
        return res.json({
            status: 200,
            data: { ...new_product, token },
            message: `product authenticated successfully`,
        });
    }
    else {
        res
            .status(404)
            .send(`The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
        console.log(`The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
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
            // res.json(new_product);
            const token = jsonwebtoken_1.default.sign({ new_product }, config_1.default.tokensecret);
            return res.json({
                status: 200,
                data: { ...new_product, token },
                message: `product authenticated successfully`,
            });
        }
        else {
            res
                .status(404)
                .send(`The product and password don't match. Please try again or go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
            console.log(`The product is not exist. Please go to: http://localhost:3000/product/sign_up and create new product and enter the first_name & last_name & email & productname & password in the body`);
        }
    }
    catch (err) {
        res.status(400).send(`can't add products to card`);
        res.json(err);
    }
};
const order_products_handler = (app) => {
    app.get("/order_products", index);
    app.get("/order_product/:id", show);
    app.post("/order_product/create", create);
    app.patch("/order_product/edit/:id", update);
    app.delete("/order_product/delete/:id", destroy);
    app.post("/user/sign_in/order/:id/products", addProduct);
};
exports.default = order_products_handler;

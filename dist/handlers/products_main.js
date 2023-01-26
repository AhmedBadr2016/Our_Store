"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_methods_1 = __importDefault(require("../models/product_methods"));
const validation_1 = __importDefault(require("../validation/validation"));
const our_product_main = new product_methods_1.default();
const index = async (_req, res) => {
    const new_product = await our_product_main.get_all_products();
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
};
const show = async (req, res) => {
    const new_product = await our_product_main.get_specific_product(req.body.id);
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
};
const create = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
        };
        const new_product = await our_product_main.create(product);
        if (new_product !== null) {
            res.json({
                status: 200,
                data: { ...new_product },
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
        res.status(401);
        res.json(`Access denied, invalid token or The product and password don't match ${err}`);
    }
};
const update = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
        };
        const new_product = await our_product_main.update_product(product);
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
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const new_product = await our_product_main.delete(req.params.id);
    if (new_product) {
        return res.json({
            status: 200,
            data: { ...new_product },
            message: `product authenticated successfully & deleted `,
        });
    }
    else {
        return res.json({
            status: 401,
            message: `No products in that order`,
        });
    }
};
const products_handler = (app) => {
    app.get("/products", validation_1.default, index);
    app.get("/product/:id", validation_1.default, show);
    app.post("/product/create", validation_1.default, create);
    app.patch("/product/edit/:id", validation_1.default, update);
    app.delete("/product/delete/:id", validation_1.default, destroy);
};
exports.default = products_handler;

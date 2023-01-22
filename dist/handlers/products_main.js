"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_methods_1 = __importDefault(require("../models/product_methods"));
const our_product_main = new product_methods_1.default();
const index = async (_req, res) => {
    const output_all = await our_product_main.get_all_products();
    res.json(output_all);
};
const show = async (req, res) => {
    const output_one = await our_product_main.get_specific_product(req.body.id);
    res.json(output_one);
};
const create = async (req, res) => {
    try {
        const product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
        };
        const new_product = await our_product_main.create(product);
        res.json(new_product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
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
        res.json(new_product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await our_product_main.delete(req.params.id);
    res.json(deleted);
};
const products_handler = (app) => {
    app.get("/products", index);
    app.get("/product/:id", show);
    app.post("/product/create", create);
    app.patch("/product/edit/:id", update);
    app.delete("/product/delete/:id", destroy);
};
exports.default = products_handler;

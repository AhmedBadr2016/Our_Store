"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import bodyParser from "body-parser";
const config_1 = __importDefault(require("./config"));
// import db from "./database";
const users_main_1 = __importDefault(require("./handlers/users_main"));
const orders_main_1 = __importDefault(require("./handlers/orders_main"));
const products_main_1 = __importDefault(require("./handlers/products_main"));
const order_products_main_1 = __importDefault(require("./handlers/order_products_main"));
const body_parser_1 = __importDefault(require("body-parser"));
// import valid_fun from "./validator/validataion";
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
console.log(config_1.default);
const port = config_1.default.port || 3000;
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
// for user handlers
(0, users_main_1.default)(app);
// for order handlers
(0, orders_main_1.default)(app);
// for product handlers
(0, products_main_1.default)(app);
// for order of products handlers
(0, order_products_main_1.default)(app);
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});

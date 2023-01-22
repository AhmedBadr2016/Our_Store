"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_methods_1 = __importDefault(require("../order_product_methods"));
const store = new order_product_methods_1.default();
describe("order_product Model", () => {
    it("should have an index method", () => {
        expect(store.get_all_order_products).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.get_specific_order_product).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have a update method", () => {
        expect(store.update_order_product).toBeDefined();
    });
    it("should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });
    it("create method should add a order_product", async () => {
        const result = await store.create({
            quantity: 10,
        });
        expect(result).toEqual({
            id: "1",
            product_id: "1",
            order_id: "1",
            quantity: 10,
        });
    });
    it("index method should return a list of order_products", async () => {
        const result = await store.get_all_order_products();
        expect(result).toEqual([
            {
                id: "1",
                product_id: "1",
                order_id: "1",
                quantity: 10,
            },
        ]);
    });
    it("show method should return the correct order_product", async () => {
        const result = await store.get_specific_order_product("1");
        expect(result).toEqual({
            id: "1",
            product_id: "1",
            order_id: "1",
            quantity: 10,
        });
    });
    it("delete method should remove the order_product", async () => {
        // store.delete();
        const result = await store.delete("1");
        expect(result).toContain([]);
    });
});

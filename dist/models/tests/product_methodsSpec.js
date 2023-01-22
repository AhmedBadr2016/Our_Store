"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_methods_1 = __importDefault(require("../product_methods"));
const store = new product_methods_1.default();
describe("product Model", () => {
    it("should have an index method", () => {
        expect(store.get_all_products).toBeDefined();
    });
    it("should have a show method", () => {
        expect(store.get_specific_product).toBeDefined();
    });
    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });
    it("should have a update method", () => {
        expect(store.update_product).toBeDefined();
    });
    it("should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });
    it("create method should add a product", async () => {
        const result = await store.create({
            name: "Bridge to Terabithia",
            price: 250,
        });
        expect(result).toEqual({
            id: "1",
            name: "Bridge to Terabithia",
            price: 250,
        });
    });
    it("index method should return a list of products", async () => {
        const result = await store.get_all_products();
        expect(result).toEqual([
            {
                id: "1",
                name: "Bridge to Terabithia",
                price: 250,
            },
        ]);
    });
    it("show method should return the correct product", async () => {
        const result = await store.get_specific_product("1");
        expect(result).toEqual({
            id: "1",
            name: "Bridge to Terabithia",
            price: 250,
        });
    });
    it("delete method should remove the product", async () => {
        // store.delete();
        const result = await store.delete("1");
        expect(result).toContain([]);
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const user_methods_1 = require("../user_methods");
const our_user = new user_methods_1.userStore();
describe("user methods", () => {
    it("Should has an index method", () => {
        expect(our_user.index).toBeDefined();
    });
    it("index method Should return a list of users", async () => {
        const output = await our_user.index();
        expect(output).toEqual([]);
    });
});

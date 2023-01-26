"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import authenticate from "../handlers/users_main";
// import Error from "../interfaces/error.interface";
const authorized_valid = (next) => {
    const error = new Error(`login Error: Please try again`);
    error.name = "Unvalid";
    next(error);
};
const valid_fun = (req, _res, next) => {
    try {
        const authHeader = req.get("Authentication");
        console.log(authHeader);
    }
    catch (error) {
        authorized_valid(next);
    }
};
exports.default = valid_fun;

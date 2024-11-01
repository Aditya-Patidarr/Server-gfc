"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = exports.UNAUTHORIZED_ACCESS = exports.corsConfig = void 0;
exports.corsConfig = {
    origin: '*',
    allowedHeaders: [
        "Authorization",
        "X-Requested-With",
        "Content-Type",
        "x-auth-token"
    ],
    maxAge: 86400, // NOTICE: 1 day
    credentials: false
};
exports.UNAUTHORIZED_ACCESS = "Unauthorised resource access..!";
exports.SECRET_KEY = "somesupersecretsecret";

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIo = exports.init = void 0;
const socket_io_1 = require("socket.io");
const constants_1 = require("./constants");
let io;
const init = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: constants_1.corsConfig
    });
    return io;
};
exports.init = init;
const getIo = () => {
    if (!io) {
        throw new Error("Socket.io is not initialized..!");
    }
    return io;
};
exports.getIo = getIo;

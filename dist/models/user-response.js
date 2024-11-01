"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const USER_RESPONSE_SCHEMA = new mongoose_1.default.Schema({
    documentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submittedOn: {
        type: Date,
        default: Date.now
    },
    answers: {}
});
module.exports = mongoose_1.default.model("UserResponse", USER_RESPONSE_SCHEMA);

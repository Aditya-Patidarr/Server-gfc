"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUESTION_SCHEMA = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OPTION_SCHEMA = new mongoose_1.default.Schema({
    option: {
        type: String,
        required: true
    },
});
exports.QUESTION_SCHEMA = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: false },
    question: {
        type: String
    },
    questionType: {
        type: String
    },
    options: [OPTION_SCHEMA],
    open: {
        type: Boolean,
    },
    required: {
        type: Boolean
    },
    answer: {
        type: Boolean
    },
    points: {
        type: Number
    }
});

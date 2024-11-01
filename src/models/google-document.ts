import mongoose, { Schema } from "mongoose";
import { QUESTION_SCHEMA } from "./question";

const DOCUMENT_SCHEMA = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    documentName: {
        type: String,
        required: true
    },
    documentDescription: {
        type: String,
        required: true
    },
    createdByUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    questions: [QUESTION_SCHEMA]
});

module.exports = mongoose.model("Document", DOCUMENT_SCHEMA);
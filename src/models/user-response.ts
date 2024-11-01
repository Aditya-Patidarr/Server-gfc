import mongoose, { Schema } from "mongoose";

const USER_RESPONSE_SCHEMA = new mongoose.Schema({
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submittedOn: {
        type: Date,
        default: Date.now
    },
    answers: {}
});

module.exports = mongoose.model("UserResponse", USER_RESPONSE_SCHEMA);
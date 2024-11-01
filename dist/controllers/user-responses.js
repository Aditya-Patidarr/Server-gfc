"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserResponseController = exports.fetchUserResponseData = exports.getUserResponseController = void 0;
const pino_1 = require("../common/pino");
const Socket_1 = require("../common/Socket");
const UserReponse = require('../models/user-response');
const getUserResponseController = (req, res) => {
    UserReponse.find({ documentId: req.params.documentId }, { _id: 0, answers: 0, __v: 0 }).populate({
        path: 'userId',
        model: 'User',
        select: 'username _id'
    })
        .then((responseData) => {
        res.status(200).send({
            formResponses: responseData
        });
    }).catch((error) => {
        pino_1.logger.error("Error in fetching the responses," /* REQUEST_FAILURE_MESSAGES.ERROR_IN_FETCHING_USER_RESPONSE */, error.message);
        res.status(500).json({ "message": "Error in fetching the responses," /* REQUEST_FAILURE_MESSAGES.ERROR_IN_FETCHING_USER_RESPONSE */ });
    });
};
exports.getUserResponseController = getUserResponseController;
const fetchUserResponseData = (req, res) => {
    UserReponse.find({ documentId: req.params.documentId, userId: req.params.userId }, { _id: 0, __v: 0 })
        // to populate the questions and document info
        .populate({
        path: 'documentId',
        model: 'Document',
        select: '-_id -createdByUserID -createdOn -updatedOn -__v'
    })
        // to populate the user info
        .populate({
        path: 'userId',
        model: 'User',
        select: 'username -_id'
    }).then((response) => {
        response = response[0];
        let data = {
            documentName: response.documentId.documentName,
            documentDescription: response.documentId.documentDescription,
            questions: response.documentId.questions,
            username: response.userId.username,
            answers: response.answers,
            submittedOn: response.submittedOn
        };
        res.status(200).send(data);
    }).catch((error) => {
        pino_1.logger.error("Error in fetching the responses," /* REQUEST_FAILURE_MESSAGES.ERROR_IN_FETCHING_USER_RESPONSE */, error.message);
        res.status(500).json({ "message": "Error in fetching the responses," /* REQUEST_FAILURE_MESSAGES.ERROR_IN_FETCHING_USER_RESPONSE */ });
    });
};
exports.fetchUserResponseData = fetchUserResponseData;
const saveUserResponseController = (req, res) => {
    let userResponse = Object.assign({}, req.body);
    let username = req.body.username;
    delete userResponse.username;
    UserReponse.findOneAndUpdate({ userId: req.body.userId, documentId: req.body.documentId }, { $set: userResponse }, { upsert: true, returnOriginal: false }).then((formResponse) => {
        pino_1.logger.info("Response saved successfully" /* REQUEST_SUCCESS_MESSAGE.RESPONSE_SAVED_SUCCESSFULLY */, formResponse._id);
        (0, Socket_1.getIo)().emit("USER_RESPONSE" /* SOCKET_CHANNEL_NAMES.USER_RESPONSE */, {
            userId: { _id: formResponse.userId, username },
            submittedOn: formResponse.submittedOn,
            documentId: formResponse.documentId
        });
        res.status(201).send({
            message: "Response saved successfully" /* REQUEST_SUCCESS_MESSAGE.RESPONSE_SAVED_SUCCESSFULLY */,
            documentId: formResponse._id
        });
    }).catch((error) => {
        pino_1.logger.error("Error in saving the user response" /* REQUEST_FAILURE_MESSAGES.ERROR_INSAVING_USER_RESPONSE */, `${req.body.username}, ${error.message}`);
        res.status(500).json({ "message": "Error in saving the user response" /* REQUEST_FAILURE_MESSAGES.ERROR_INSAVING_USER_RESPONSE */ });
    });
};
exports.saveUserResponseController = saveUserResponseController;

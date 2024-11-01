"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.createNewDocument = exports.getAllDocumentIds = exports.getGoogleDocumentByIdController = void 0;
const constants_1 = require("../common/constants");
const pino_1 = require("../common/pino");
const Document = require('../models/google-document');
let mongoose = require("mongoose");
// retreives one the document
const getGoogleDocumentByIdController = (req, res) => {
    if (!(req === null || req === void 0 ? void 0 : req.isUserAuth)) {
        res.status(401).send({ message: constants_1.UNAUTHORIZED_ACCESS });
    }
    else {
        Document.find({ _id: req.params.documentId }).then((response) => {
            pino_1.logger.info("User fetched data" /* REQUEST_SUCCESS_MESSAGE.DOCUMENT_DATAIS_FETCHED */);
            res.status(200).send({
                document: response[0]
            });
        }).catch((error) => {
            pino_1.logger.error("Error in fetching the documents," /* REQUEST_FAILURE_MESSAGES.ERROR_IN_FECTING_THE_DOCUMENT */, error.message);
            res.status(500).json(error);
        });
    }
};
exports.getGoogleDocumentByIdController = getGoogleDocumentByIdController;
// retreives all the documents data
const getAllDocumentIds = (req, res) => {
    if (!(req === null || req === void 0 ? void 0 : req.isUserAuth)) {
        res.status(401).send({ message: constants_1.UNAUTHORIZED_ACCESS });
    }
    req.body.userId = new mongoose.Types.ObjectId(req.body.userId);
    Document.find({ createdByUserID: req.body.userId }, { documentName: true, _id: true, createdOn: true, updatedOn: true }).then((response) => {
        res.status(200).send({
            documents: response
        });
    }).catch((error) => {
        pino_1.logger.error("Error in fetching the documents," /* REQUEST_FAILURE_MESSAGES.ERROR_IN_FECTING_THE_DOCUMENT */, error.message);
        res.status(500).send([]);
    });
};
exports.getAllDocumentIds = getAllDocumentIds;
// creates new document
const createNewDocument = (req, res) => {
    if (!(req === null || req === void 0 ? void 0 : req.isUserAuth)) {
        res.status(401).send({ message: constants_1.UNAUTHORIZED_ACCESS });
    }
    else {
        let document = new Document(req.body);
        req.body.createdByUserID = new mongoose.Types.ObjectId(req.body.createdByUserID);
        document.save().then((response) => {
            pino_1.logger.info("Document created successfully" /* REQUEST_SUCCESS_MESSAGE.DOCUMENT_CREATED_SUCCESSFULLY */, response._id);
            res.status(201).send({
                message: "Document created successfully" /* REQUEST_SUCCESS_MESSAGE.DOCUMENT_CREATED_SUCCESSFULLY */,
                documentId: response._id,
                document: {
                    documentName: response.documentName,
                    createdOn: response.createdOn,
                    updatedOn: response.updatedOn
                }
            });
        }).catch((error) => {
            pino_1.logger.error("Error in creating new document" /* REQUEST_FAILURE_MESSAGES.ERROR_IN_CREATING_NEW_DOCUMENT */, req.body.createdBy, error.message);
            res.status(500).json(error);
        });
    }
};
exports.createNewDocument = createNewDocument;
// update the document
const updateDocument = (req, res) => {
    if (!(req === null || req === void 0 ? void 0 : req.isUserAuth)) {
        res.status(401).send({ message: constants_1.UNAUTHORIZED_ACCESS });
    }
    const document = {
        documentName: req.body.documentName,
        documentDescription: req.body.documentDescription,
        questions: req.body.questions,
        updatedOn: req.body.updatedOn
    };
    Document.findByIdAndUpdate((req.body._id).trim(), { $set: document }, { new: false }).then(() => {
        pino_1.logger.info("Document updated successfully" /* REQUEST_SUCCESS_MESSAGE.DOCUMENT_UPDATED_SUCCESSFULLY */, req.body._id);
        res.status(200).send({ code: 200, message: "Document updated successfully" /* REQUEST_SUCCESS_MESSAGE.DOCUMENT_UPDATED_SUCCESSFULLY */ });
    }).catch((error) => {
        pino_1.logger.error("Unable to update document, " /* REQUEST_FAILURE_MESSAGES.UNABLE_TO_UPDATE_DOCUMENT */, req.body._id, error);
        res.status(500).send("Internal Server Error" /* REQUEST_FAILURE_MESSAGES.INTERNAL_SERVER_ERROR */);
    });
};
exports.updateDocument = updateDocument;
const deleteDocument = (req, res) => {
    var _a;
    if (!req.isUserAuth) {
        res.status(401).send({ message: constants_1.UNAUTHORIZED_ACCESS });
    }
    let documentId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.documentId;
    Document.deleteOne({ _id: documentId }).then(() => {
        pino_1.logger.error("Document Deleted Successfully" /* REQUEST_SUCCESS_MESSAGE.DOCUMENT_DELETED_SUCCESSFULLY */, req.body._id);
        res.status(200).json({ msg: "Document Deleted Successfully" /* REQUEST_SUCCESS_MESSAGE.DOCUMENT_DELETED_SUCCESSFULLY */, documentId });
    }).catch((error) => {
        pino_1.logger.error("Unable to delete the document...!" /* REQUEST_FAILURE_MESSAGES.DOCUMENT_DELETION_FAILED */, req.body._id, error);
        res.json({ msg: "Unable to delete the document...!" /* REQUEST_FAILURE_MESSAGES.DOCUMENT_DELETION_FAILED */ });
    });
};
exports.deleteDocument = deleteDocument;

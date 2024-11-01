"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_document_1 = require("../controllers/google-document");
const router = express_1.default.Router();
router.get("/document/:documentId" /* API_REQUEST_ROUTES.GET_DOCUMENT_BY_DOCUMENT_ID */, google_document_1.getGoogleDocumentByIdController);
router.post("/documents" /* API_REQUEST_ROUTES.GET_ALL_DOCUMENTS */, google_document_1.getAllDocumentIds);
router.post("/create-document" /* API_REQUEST_ROUTES.CREATE_NEW_DOCUMENT */, google_document_1.createNewDocument);
router.put("/update-document" /* API_REQUEST_ROUTES.UPDATE_DOCUMENT */, google_document_1.updateDocument);
router.delete("/delete/:documentId" /* API_REQUEST_ROUTES.DELETE_DOCUMENT_BY_ID */, google_document_1.deleteDocument);
exports.default = router;

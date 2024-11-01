import express from 'express';
import {
    createNewDocument, deleteDocument, getAllDocumentIds,
    getGoogleDocumentByIdController, updateDocument
} from '../controllers/google-document';
import { API_REQUEST_ROUTES } from '../common/constants';

const router = express.Router();

router.get(API_REQUEST_ROUTES.GET_DOCUMENT_BY_DOCUMENT_ID, getGoogleDocumentByIdController);
router.post(API_REQUEST_ROUTES.GET_ALL_DOCUMENTS, getAllDocumentIds);
router.post(API_REQUEST_ROUTES.CREATE_NEW_DOCUMENT, createNewDocument);
router.put(API_REQUEST_ROUTES.UPDATE_DOCUMENT, updateDocument);
router.delete(API_REQUEST_ROUTES.DELETE_DOCUMENT_BY_ID, deleteDocument);

export default router;
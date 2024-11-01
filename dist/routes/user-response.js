"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_responses_1 = require("../controllers/user-responses");
const router = express_1.default.Router();
router.get("/user-response/:documentId" /* API_REQUEST_ROUTES.GET_USER_RESPONSE_BY_ID */, user_responses_1.getUserResponseController);
router.post("/user-response/:documentId" /* API_REQUEST_ROUTES.SAVE_USER_RESPONSE */, user_responses_1.saveUserResponseController);
router.get("/user-response/:userId/:documentId" /* API_REQUEST_ROUTES.GET_USER_RESPONSE_BY_USER_ID */, user_responses_1.fetchUserResponseData);
exports.default = router;

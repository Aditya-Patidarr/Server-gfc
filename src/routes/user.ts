import express from 'express';
import { getUserByIdController, signInUserController, signUpUserController } from '../controllers/user';
import { API_REQUEST_ROUTES } from '../common/constants';

const router = express.Router();

// search user by id
router.get(API_REQUEST_ROUTES.GET_USER_BY_ID, getUserByIdController);

// login the user
router.post(API_REQUEST_ROUTES.USER_LOGIN, signInUserController);

// create new user
router.post(API_REQUEST_ROUTES.USER_REGISTER, signUpUserController);

export default router;
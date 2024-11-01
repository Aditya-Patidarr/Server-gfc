"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUserController = exports.signUpUserController = exports.getUserByIdController = void 0;
const pino_1 = require("../common/pino");
const constants_1 = require("../common/constants");
const Users = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const LOGGED_IN = "Logged In";
const ONE_DAY = "1d";
const getUserByIdController = (req, res) => {
    Users.find({ username: req.params.id })
        .then((result) => {
        pino_1.logger.info("User logged in successfully" /* REQUEST_SUCCESS_MESSAGE.USER_LOGGEDIN_SUCCESSFULLY */);
        res.status(200).send(result);
    })
        .catch((error) => {
        pino_1.logger.error("Error in fetching the user data," /* REQUEST_FAILURE_MESSAGES.ERROR_IN_FETCHING_USER_DATA */, error === null || error === void 0 ? void 0 : error.message);
    });
};
exports.getUserByIdController = getUserByIdController;
const signUpUserController = (req, res) => {
    try {
        let user = new Users(req.body);
        Users.find({ email: req.body.email }).then((response) => {
            if (response.length > 0) {
                res.status(403).send("User already exists, try new email address" /* REQUEST_FAILURE_MESSAGES.USER_ALREADY_EXISTS */);
            }
            else {
                bcrypt.hash(user.password, 12).then((hashedPassword) => {
                    user.password = hashedPassword;
                    user.save().then((response) => {
                        pino_1.logger.info("User created successfully" /* REQUEST_SUCCESS_MESSAGE.USER_CREATED_SUCCESSFULLY */, req.body.email);
                        const token = jwt.sign({
                            email: response.email,
                            username: response.username,
                            userId: response._id.toString()
                        }, constants_1.SECRET_KEY, { expiresIn: ONE_DAY });
                        pino_1.logger.info("User logged in successfully" /* REQUEST_SUCCESS_MESSAGE.USER_LOGGEDIN_SUCCESSFULLY */, { email: response.email, username: response.username });
                        // login the user as soon as user logs in
                        res.status(200).json({
                            message: LOGGED_IN,
                            token: token,
                            userId: response._id.toString(),
                            data: { email: response.email, username: response.username }
                        });
                    });
                });
            }
        });
    }
    catch (error) {
        pino_1.logger.error("Unable to create the user," /* REQUEST_FAILURE_MESSAGES.UNABLE_TO_CREATE_USER */, req.body.email, error);
        res.status(500).send("Internal Server Error" /* REQUEST_FAILURE_MESSAGES.INTERNAL_SERVER_ERROR */);
    }
};
exports.signUpUserController = signUpUserController;
const signInUserController = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" /* REQUEST_FAILURE_MESSAGES.PLEASE_ENTER_ALL_FIELDS */ });
    }
    Users.find({ email: email }).then((user) => {
        if (user.length == 0) {
            pino_1.logger.error("User data not found..!" /* REQUEST_FAILURE_MESSAGES.USER_DATA_NOT_FOUND */, email);
            res.status(403).send({ message: "User data not found..!" /* REQUEST_FAILURE_MESSAGES.USER_DATA_NOT_FOUND */ });
        }
        else {
            const { email, username, _id } = user[0];
            bcrypt.compare(password, user[0].password)
                .then((isMatched) => {
                if (!isMatched) {
                    res.status(402).send({ message: "Password is incorrect..!" /* REQUEST_FAILURE_MESSAGES.PASSWORD_INCORRECT */ });
                }
                else {
                    const token = jwt.sign({
                        email,
                        username,
                        userId: _id.toString()
                    }, constants_1.SECRET_KEY, { expiresIn: ONE_DAY });
                    pino_1.logger.info("User logged in successfully" /* REQUEST_SUCCESS_MESSAGE.USER_LOGGEDIN_SUCCESSFULLY */, { email, username });
                    res.status(200).json({
                        message: LOGGED_IN,
                        token: token,
                        userId: _id.toString(),
                        data: { email, username }
                    });
                }
            })
                .catch((error) => {
                pino_1.logger.error("Unable to signin the user," /* REQUEST_FAILURE_MESSAGES.UNABLE_TO_SIGNIN_USER */, email, error);
                res.status(401).send("Unable to signin the user," /* REQUEST_FAILURE_MESSAGES.UNABLE_TO_SIGNIN_USER */);
            });
        }
    }).catch((error) => {
        pino_1.logger.error("Unable to signin the user," /* REQUEST_FAILURE_MESSAGES.UNABLE_TO_SIGNIN_USER */, email, error);
        res.status(500).send("Unable to signin the user," /* REQUEST_FAILURE_MESSAGES.UNABLE_TO_SIGNIN_USER */);
    });
};
exports.signInUserController = signInUserController;

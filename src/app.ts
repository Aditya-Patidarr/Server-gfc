import express from 'express';
import bodyParser from 'body-parser';
import questionsRouter from './routes/google-document';
import userRouter from './routes/user';
import userResponseRouter from './routes/user-response';
import { corsConfig, REQUEST_FAILURE_MESSAGES, REQUEST_SUCCESS_MESSAGE, SECRET_KEY, SOCKET_EVENTS } from './common/constants';
import cors from "cors";
import mongoose, { mongo } from 'mongoose';
import { logger } from './common/pino';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: './src/.env' });
const AUTHORISATION = "Authorization";
const SOCKET_CONNECTED = "Socket connected: ";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

const mongo_url = process.env.MONGO_URL as string ;
const PORT = process.env.PORT ;
mongoose.connect(mongo_url)
  .then(() => {
    logger.info(REQUEST_SUCCESS_MESSAGE.DATABASE_CONNECTED_SUCCESSFULLY);
    const server = app.listen(PORT || 9000, () => {
      logger.info(REQUEST_SUCCESS_MESSAGE.APP_STARTED);
    });

    const io = require('./common/Socket').init(server);
    io.on(SOCKET_EVENTS.CONNECTION, (socket: any) => {
      logger.info(SOCKET_CONNECTED, socket.id);
    });
  })
  .catch((err) => {
    logger.error(REQUEST_FAILURE_MESSAGES.ERROR_IN_CONNECTING_DB, err);
    logger.error(REQUEST_FAILURE_MESSAGES.APP_CRASHED);
    process.exit();
  });


// for user authentication 
app.use((req: any, res: any, next: any) => {
  const authHeader = req.get(AUTHORISATION);
  if (!authHeader) {
    req.isUserAuth = false;
    return next();
  }

  const token = authHeader;
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    req.isUserAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isUserAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.isUserAuth = true;
  next();
});

// routes for user
app.use(userRouter);

// document routes
app.use(questionsRouter);

//collecting user responses
app.use(userResponseRouter);


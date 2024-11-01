
export const corsConfig = {
  origin: '*',
  allowedHeaders: [
    "Authorization",
    "X-Requested-With",
    "Content-Type",
    "x-auth-token"
  ],
  maxAge: 86400, // NOTICE: 1 day
  credentials: false
};

export const enum REQUEST_SUCCESS_MESSAGE {
  DOCUMENT_CREATED_SUCCESSFULLY = "Document created successfully",
  DOCUMENT_UPDATED_SUCCESSFULLY = 'Document updated successfully',
  DOCUMENT_DELETED_SUCCESSFULLY = "Document Deleted Successfully",
  DOCUMENT_DATAIS_FETCHED = `User fetched data`,
  USER_CREATED_SUCCESSFULLY = "User created successfully",
  USER_LOGGEDIN_SUCCESSFULLY = "User logged in successfully",
  RESPONSE_SAVED_SUCCESSFULLY = "Response saved successfully",
  DATABASE_CONNECTED_SUCCESSFULLY = "Moongoose connected successfully...",
  APP_STARTED = `Express server is up and running`
}

export const enum REQUEST_FAILURE_MESSAGES {
  DOCUMENT_DELETION_FAILED = "Unable to delete the document...!",
  DOCUMENT_DATAIS_FETCHED = `User fetched data`,
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  PLEASE_ENTER_ALL_FIELDS = "Please enter all fields",
  USER_ALREADY_EXISTS = 'User already exists, try new email address',
  USER_DATA_NOT_FOUND = "User data not found..!",
  PASSWORD_INCORRECT = "Password is incorrect..!",
  UNABLE_TO_CREATE_USER = "Unable to create the user,",
  UNABLE_TO_SIGNIN_USER = "Unable to signin the user,",
  ERROR_IN_FETCHING_USER_DATA = "Error in fetching the user data,",
  ERROR_IN_FETCHING_USER_RESPONSE = "Error in fetching the responses,",
  ERROR_INSAVING_USER_RESPONSE = "Error in saving the user response",
  APP_CRASHED = "App crashed",
  ERROR_IN_CONNECTING_DB = "Unable to connect the monog-db database",
  UNABLE_TO_UPDATE_DOCUMENT = "Unable to update document, ",
  ERROR_IN_FECTING_THE_DOCUMENT = "Error in fetching the documents,",
  ERROR_IN_CREATING_NEW_DOCUMENT = "Error in creating new document"
}

export const enum SOCKET_CHANNEL_NAMES {
  USER_RESPONSE = 'USER_RESPONSE'
}

export const enum SOCKET_EVENTS {
  CONNECTION = "connection"
}

export const enum API_REQUEST_ROUTES {
  GET_USER_BY_ID = '/:id',
  USER_LOGIN = '/login',
  USER_REGISTER = '/register',
  GET_DOCUMENT_BY_DOCUMENT_ID = '/document/:documentId',
  GET_ALL_DOCUMENTS = '/documents',
  CREATE_NEW_DOCUMENT = '/create-document',
  UPDATE_DOCUMENT = '/update-document',
  DELETE_DOCUMENT_BY_ID = '/delete/:documentId',
  GET_USER_RESPONSE_BY_ID = '/user-response/:documentId',
  SAVE_USER_RESPONSE = '/user-response/:documentId',
  GET_USER_RESPONSE_BY_USER_ID = '/user-response/:userId/:documentId'
}

export const UNAUTHORIZED_ACCESS = "Unauthorised resource access..!";
export const SECRET_KEY = "somesupersecretsecret";

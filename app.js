require('dotenv').config();
const express = require('express');
const console = require('morgan');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const { errorHandler, notFound } = require('./utils/middleware/errorHandlers');
//const THIRTY_DAYS_IN_SEC = 2592000;


const router = require('./network/routes');
const { connect } = require('./database');
const app = express();

// Store Session and Data Base
connect();

//--- Middlewars
app.use(console('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors());
app.use(helmet());

//-----Passport-----
app.use(passport.initialize());
app.use(passport.session());

//-- Routes ---
router(app); // le pasamos nuestras rutas al archivo network/routes.js


//Page 404
app.use(notFound);
//Error Handler
app.use(errorHandler);

process.on('unhandledRejection', error => {
    console.log('UnhandledRejection', error);
});

process.on('unhandledException', error => {
    console.log('unhandledException', error);
});

module.exports = app;
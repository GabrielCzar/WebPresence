'use strict';

/** @namespace app.controllers */

const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const mongooseSeed = require('./config/seed');
const session = require('express-session');
const { log, error } = require('console');
const bodyParser = require('body-parser');
const load = require('express-load');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router({});
const path = require('path');
const app = express();

mongoose.connect(`mongodb://${process.env.MONGO || 'mongo:27017'}/presence_db`, { poolSize: 10 })
    .then(() => { log('Connected to database => presence_db.'); mongooseSeed(); })
    .catch(e => error('Error to establish connection with database. ' + e.message));

// Connection global access
global.db = mongoose.connection;

// Configurations
app.set('views', path.join(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname + '/public')));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, secret: 'your secret here'}));
app.use(router);

load('models').then('controllers').then('routes').into(app);

app.listen(process.env.PORT || 3000, () => log("PresenceWeb Server is Online..."));

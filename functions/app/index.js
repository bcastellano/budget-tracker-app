'use strict'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
//app.use(myMiddleware);

// parse application/json
app.use(bodyParser.json());

// load routes
routes(app)

module.exports = app

// main starting point of application
const express = require('express');
const http = require('http'); // native Node library, for working very low level with http requests
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); // creates instance of express
const router = require('./router');

// App Setup

// express middleware. Any incoming requests will be passed into this
app.use(morgan('combined')); // registers as middleware. Morgan is a logging framework, good for debugging
app.use(bodyParser.json({ type: '*/*'})); // middleware used to parse incoming requests into json
router(app);


// Server Setup
// if env variable of port defined, use it, otherwise use 3090
const port = process.env.PORT || 3090;
// create an http server that knows how to receive requests, and anything that comes in, forward it to our express application, app
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

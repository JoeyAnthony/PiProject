'use strict';
var express = require('express');
var bodyParser = require('body-parser')

//server
var app = module.exports = express();

// 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//files that needs app
var data = require('./data/SaveLoad');
var led = require('./led/LedScriptExecution');

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
})

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
})

/**
 * Starts webserver
 * 127.0.0.1:8081 on windows
 */
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    //initialization
    data.MakeFileTree();

    console.log("Example app listening at http://%s:%s", host, port);
})


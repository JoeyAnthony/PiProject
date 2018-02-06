var app = require('./../app');
var executor = require('./Executor');
var data = require('./../data/SaveLoad');


app.post('/led/execute', (req, res) => {
    executor.RunScript(data.scriptPath + "test.py");
});

app.get('/led/terminate', (req, res) => {
    executor.TerminateProcess();
});
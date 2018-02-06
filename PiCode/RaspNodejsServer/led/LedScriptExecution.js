const app = require('./../app');
const executor = require('./Executor');
const data = require('./../data/SaveLoad');

/**
 * Executes a python script on a child process
 */
app.post('/led/execute', (req, res) => {
    executor.RunScript(data.scriptPath + "test.py");
});

/**
 * TODO
 * Returns a list of running processes
 */
app.get('/led/running', (req, res) => {
    
});

/**
 * Terminates a python script on a child process
 */
app.get('/led/terminate', (req, res) => {
    executor.TerminateProcess();
});
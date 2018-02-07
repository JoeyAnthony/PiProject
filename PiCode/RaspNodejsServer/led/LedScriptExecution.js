const app = require('./../app');
const executor = require('./Executor');
const data = require('./../data/SaveLoad');

/**
 * Executes a python script on a child process
 */
app.post('/led/execute', (req, res) => {
    if(executor.RunScript(req.body.processname, req.body.filename, res)){

    }
});

/**
 * TODO
 * Returns a list of running processes
 */
app.get('/led/running', (req, res) => {
    var names = [];
    executor.processList.forEach(element => {
        names.push(element.name);
    });
    
    res.send(JSON.stringify(names));
});

/**
 * Terminates a python script on a child process
 */
app.post('/led/terminate', (req, res) => {
    if(executor.TerminateProcess(req.body.processname)){
        res.send(JSON.stringify("Terminated"));
    }
    else
    {
        res.send(JSON.stringify("Not Existent"));
    }
});
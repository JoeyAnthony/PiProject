const data = require('./../data/SaveLoad');
const childprocess = require('child_process');
const PythonShell = require('python-shell');

let pyOptions = {
    mode: 'text',
    scriptPath: data.scriptPath
};

let runningProcess;// = new PythonProcess("test", 'test.py', pyOptions);

class PythonProcess{
    constructor(name, script, options){
        this.name = name;
        this.process = new PythonShell(script, options);
 
        this.process.on('message', (message) => {
            console.log(`${name}: ` + message)
        });
        
        this.process.on('error', (err) =>{
            if(err)
                console.log(err);
        });
        
        /**
         * callback when childprocess has ended
         */
        this.process.on('close', () => {
            console.log("process finished");
        });
    }
}


/**
 * Runs an external script on a childprocess
 * @param {string} scriptpath
 */
function RunScript(scriptpath) {
    runningProcess = new PythonProcess("process1", 'test.py', pyOptions);
};
exports.RunScript = RunScript;

/**
 * Returns true if a childprocess is active
 */
function IsTerminated() {
    if (runningProcess == undefined) {
        console.log("No active process");
        return;
    }
    var terminated = false;
    if(runningProcess.process.terminated)
        terminated = true;
    if(runningProcess.process.childProcess.killed)
        terminated = true;

    return terminated;
}
exports.IsTerminated = IsTerminated;

/**
 * terminates the childprocess
 */
function TerminateProcess(){
    if (runningProcess == undefined) {
        console.log("No active process");
        return;
    }
    //SIGTERM is the signal to terminate the sub-process
    runningProcess.process.childProcess.kill('SIGINT');
}
exports.TerminateProcess = TerminateProcess;
 
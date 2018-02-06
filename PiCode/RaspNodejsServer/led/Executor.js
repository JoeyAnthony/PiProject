var data = require('./../data/SaveLoad');
var childprocess = require('child_process');

var py = require('python-shell');
var pyOptions = {
    mode: 'text',
    scriptPath: data.scriptPath
};

py.run('test.py', pyOptions, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log(results);
    }
});




/**
 * Runs an external script on a childprocess
 * @param {string} scriptpath
 */
function RunScript(scriptpath) {
    if (IsRunning()) {
        console.log("Already running sccript");
        return;
    }

    ActiveProcess = childprocess.exec(scriptpath, (err, stdout, stderr) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("Should be executing");
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
};
exports.RunScript = RunScript;

/**
 * Returns true if a childprocess is active
 */
function IsRunning() {
    if (ActiveProcess == undefined || ActiveProcess.killed)
        return false;

    return true;
}
exports.IsRunning = IsRunning;

/**
 * terminates the childprocess
 */
function TerminateProcess(){
    if (ActiveProcess == undefined || ActiveProcess.killed) {
        console.log("No active process");
        return;
    }
    //SIGTERM is the signal to terminate the sub-process
    ActiveProcess.kill('SIGTERM');
}
exports.TerminateProcess = TerminateProcess;

/**
 * callback when childprocess is killed
 */
function Terminated() {
    console.log("proces killed");
    if (ActiveProcess == undefined)
        return;

    ActiveProcess = undefined;
}

//ActiveProcess.on('close', (code) => {
//    console.log("on close: " + code)
//    console.log("stdout close: " + ActiveProcess.stdout);
//})

//ActiveProcess.on('message', (msg) => {
//    console.log("on message: " + msg)
//    console.log("stdout message:" + ActiveProcess.stdout);
//})

//ActiveProcess.on('error', (err) => {
//    console.log("error: " + err);
//});


//activeprocess.stdout.on('data', () =>{
//    console.log('on stdout data');
//})
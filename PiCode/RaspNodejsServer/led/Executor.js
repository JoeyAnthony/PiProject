const data = require('./../data/SaveLoad');
const childprocess = require('child_process');
const PythonShell = require('python-shell');

var processList = [];
exports.processList = processList;

let pyOptions = {
    mode: 'text',
    scriptPath: data.scriptPath
};

let runningProcess;// = new PythonProcess("test", 'test.py', pyOptions);

class PythonProcess{
    constructor(name, script, options, processList){
        this.name = name;
        this.process = new PythonShell(script, options);
        this.running = true;
        this.processList = processList;
        processList.push(this);
 
        this.process.on('message', (message) => {
            console.log(`${name}: ` + message)
        });
        
        this.process.on('error', (err) =>{
            if(err){
                console.log(err);
                this.TerminateProcess();
            }
        });
        
        /**
         * callback when childprocess has ended
         */
        this.process.on('close', () => {
            console.log("process finished");
            this.running = false;
            this.RemoveFromList();
        });

    }

    /**
    * terminates the childprocess
    */
    TerminateProcess(){
    //SIGTERM is the signal to terminate the sub-process
    this.process.childProcess.kill('SIGINT');
    this.running = false;
    this.RemoveFromList();
    }
    /**
     * removes itself from the processList
     */
    RemoveFromList(){
        for(i = 0; i < this.processList.length; i++){
            if(this.processList[i].name == this.name) {
                this.processList.splice(i, 1);
                return;
            }
        }
    }
}

/**
 * Runs an external script on a childprocess, returns false if processname exists
 * @param {string} scriptpath
 */
function RunScript(name, script, response) {
    let found = ContainsProcess(name);
    if(found != undefined)
    {
        response.send(JSON.stringify("Already Active"));
        return;
    }
    let pp = new PythonProcess(name, script, pyOptions, processList);
    response.send(JSON.stringify("Running"));
};
exports.RunScript = RunScript;

/**
 * Terminates gives processname, if it exist returns true
 * @param {string} name 
 */
function TerminateProcess(name)
{
   let found = (ContainsProcess(name))
   if(found)
   {
        found.TerminateProcess();
        return true;
   }
   else
   {
        return false;
   }
}
exports.TerminateProcess = TerminateProcess;

/**
 * Returns object if it exists, else undefined
 * @param {string} name 
 */
function ContainsProcess(name){
    for(i = 0; i < processList.length; i++){
        if (name == processList[i].name)
            return processList[i];
    }

    // processList.forEach( (element) => {
    //     if(name == element.name)
    //         return element;
    // });
}

 
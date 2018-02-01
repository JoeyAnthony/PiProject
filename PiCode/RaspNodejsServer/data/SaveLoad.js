var app = require('./../app')
var fs = require('fs');
var path = require('path');

var appDir = path.dirname(require.main.filename);
var filepath = appDir + '/files/';

//sends list of saved files
app.get('/data', (req, res) => {
    fs.readdir(filepath, (err, files) => {
        //check for errors
        if (err) {
            let gooddirs = CheckDirectories(err, req, res);
            if (gooddirs) {
                res.send("Directories are OK");
            }
        }
        //send data
        else {
            console.log(files);
            res.send(JSON.stringify(files));
        }
    });

    
});

function CheckDirectories(errormsg, req, res) {
    let goodDirs = true;

    console.log(errormsg);
    //no such directory
    if (errormsg.errno == -4058) {
        //create directories
        let createdDirs = CreateDirs();
        if (!createdDirs) {
            console.log("Couldn't create dirs");
            goodDirs = false;
        }

    }
    //unknown error
    else {
        res.send(err.message);
        goodDirs = false;
    }

    return goodDirs;
}

function CreateDirs() {
    fs.mkdir(filepath , (err) => {
        //check error
        if (err) {
            console.log(err.message);
            return false;
        }
        return true;
    });
}
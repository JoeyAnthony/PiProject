/**
 * Save and loading code for server
 */

var app = require('./../app');
var fs = require('fs');
var path = require('path');

var appDir = path.dirname(require.main.filename);
var filePath = appDir + '/files/';
var scriptPath = appDir + '/files/scripts/';
var savePath = appDir + '/files/userdata';

exports.filePath = filePath;
exports.scriptPath = scriptPath;
exports.savePath = savePath;

/**
* GET request sends back the files inside the savepath
*/
app.get('/data', (req, res) => {
    fs.readdir(savePath, (err, files) => {
        if (err) {
            console.log("route: /data");
            res.send(JSON.stringify(err));
        }
        else {
            res.send(JSON.stringify(files));
        }
    });
});

/**
* POST request sends the content of a file inside savepath
*  only accepts json body and uses the field "filename" for the file
*/
app.post('/data/load', (req, res) => {
    fs.readFile(path.join(savePath, req.body.filename + ".json"), (err, data) =>{
        if (err) {
            console.log(err.message);
            console.log("route: /data/load");
            res.send(JSON.stringify(err));
        }
        else {
            res.send(data);
        }
    });
});

/**
* POST request saves the content of a file inside savepath
*  only accepts json body and uses the field "filename" for the file
*/
//todo: parse first and check for errors
app.post('/data/save', (req, res) => {
    fs.writeFile(path.join(savePath, req.body.filename + ".json"), JSON.stringify(req.body) , (err) => {
        if (err) {
            console.log(err.message);
            console.log("route: /data/save");
            res.sendDate(JSON.stringify(err));
        }
        else {
            res.send(JSON.stringify("File saved"));
        }
    });
    return;
});

/**
* POST request deletes a file inside savepath
*  only accepts json body and uses the field "filename" for the file
*/
app.delete('/data', (req, res) => {
    fs.unlink(path.join(savePath, req.body.filename + ".json"), (err) =>
    {
        if (err) {
            console.log(err.message);
            console.log("route: /data/delete");
            res.send(JSON.stringify(err));
        }
        else {
            res.send(JSON.stringify("File deleted"));
        }
        });

});

/**
 * Creates the filetree if not already done
 */
function MakeFileTree() {
    CreateDirs(filePath);
    CreateDirs(savePath);
    CreateDirs(scriptPath);
}
/**
 * Creates a folder with mkdir
 * @param {string} path
 */
function CreateDirs(path) {
    fs.mkdir(path, (err) => {
        //check error
        if (err) {
            if (err.errno = -4075)
                return true;

            console.log(err);
            console.log(err.message);
            return false;
        }
        return true;
    });
}

exports.MakeFileTree = MakeFileTree;
var app = require('./../app')
var fs = require('fs');
var path = require('path');

var appDir = path.dirname(require.main.filename);
var filepath = appDir + '/files/';

//sends list of saved files
app.get('/data', (req, res) => {
    fs.readdir(filepath, (err, files) => {
        if (err) {
            res.send(JSON.stringify(err));
        }
        else {
            console.log(files);
            res.send(JSON.stringify(files));
        }
    });
});

app.post('data/load', (req, res) => {
    console.log(req.body);
    fs.readFile(path.join(filepath, req.body.filename), (err, data) =>{
        if (err) {
            console.log(err.message);
            res.send(JSON.stringify(err));
        }
        else {
            console.log(data);
            res.send(data);
        }
    });
});

//todo: parse first and check for errors
app.post('/data/save', (req, res) => {
    console.log(res.json);
    if (req.body == undefined || req.body == "") {
        res.send(JSON.stringify("Empty"));
        return;
    }
    fs.writeFile(path.join(filepath, req.body.filename), "Testing with this string", (err) => {
        if (err) {
            res.sendDate(JSON.stringify(err));
        }
        else {
            console.log(req.body.filename + " :saved");
            res.send(JSON.stringify("File saved"));
        }
    });
    return;
});


exports.CreateDirs = function CreateDirs() {
    fs.mkdir(filepath , (err) => {
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

const fs = require('fs');
const path = './data.json';

let data = JSON.parse(fs.readFileSync(path));

function serialize() {
    fs.writeFileSync(path, JSON.stringify(data));
}

exports.getData = function (req, res) {
    let answer = "Data:\n";
    data.forEach(element => {
        answer += element.id + ": " + element.body + "\n";
    });
    res.send(answer);
}

exports.get = function (req, res) {
    let id = req.params.id;
    let elem = data.find(el => el.id == id);
    if (elem) {
        res.send("Element:\n" + elem.id + ": " + elem.body);
    } else {
        res.send("ERROR: Not found!");
    }
}

exports.update = function (req, res) {
    let id = req.params.id;
    let index = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            index = i;
        }
    }
    if (index < 0) {
        res.send("ERROR: Not found!");
        return;
    }
    let body = req.params.param;
    data[index].body = body;
    serialize();
    res.send("Success");
}

exports.insert = function (req, res) {
    let id = req.params.id;
    let index = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            index = i;
        }
    }
    let body = req.params.param;
    if (index >= 0) {
        data[index].body = body;
        serialize()
        res.send("Success. Update element");
        return;
    }

    let buf = {
        id: id,
        body: body
    };
    data.push(buf);
    serialize();
    res.send("Success");
}

exports.delete = function (req, res) {
    let id = req.params.id;
    let contains = data.find(el => el.id == id);
    if (contains) {
        data = data.filter(el => el.id != id);
        serialize();
        res.send("Success");
    } else {
        res.send("ERROR: Not found!");
    }
}
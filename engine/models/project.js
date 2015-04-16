/**
 * Created by valentin on 16.04.2015.
 */
var fs = require('fs');

var Project;

Project = function (filename) {
    var _filename = filename;
    var _infos = {};
    var self = this;

    this.get = function (key) {
        return _infos[key];
    };

    this.getWithDefault = function (key, defValue) {
        if (defValue == null || defValue == undefined)
            defValue = "-";

        return self.has(key) ? self.get(key) : defValue;
    };

    this.has = function (key) {
        return _infos[key] != null && _infos[key] != undefined;
    };

    this.all = function () {
        return _infos;
    };

    /* --- MAIN BLOCK --- */
    try {
        _infos = JSON.parse(fs.readFileSync(_filename, 'utf8'));
    } catch (err) {
        throw new Error("File 'project.json' not found");
    }

    if (!this.has('name') || !this.has('version'))
        throw new Error("The project must have a name and a version!");

    return this;
};

module.exports = Project;
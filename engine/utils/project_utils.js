/**
 * Installs the dependencies defined in the project.json file.
 *
 * @package engine\utils
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 20.04.2015
 */
"use strict";

var unirest = require('unirest'),
    OmenAPI = require('./omen_api'),
    AdmZip = require('adm-zip');

var self = {};

var _isValid = function (value) {
    return value !== undefined && value !== null;
};

self.buildDependencies = function (project, cli) {
    var versionPattern = new RegExp("^(<|>|<=|>=)?([0-9]+).((\\*|[0-9]+)(\.([0-9]+|\\*))?)$", "i"),
        returnDeps = [],
        dependencies = project.get('dependencies'),
        i = 0;

    if (!_isValid(dependencies))
        return returnDeps;


    for (var iElem in dependencies) {
        var app = iElem,
            verArr = versionPattern.exec(dependencies[iElem]),
            version = {};

        version.operator = verArr[1];
        if (!_isValid(version.operator))
            version.operator = "=";

        version.major = verArr[2];
        version.minor = verArr[4];
        version.patch = verArr[6];

        if (!_isValid(version.minor))
            version.minor = "0";
        else if (version.minor == "*")
            version.like = true;

        if (!_isValid(version.patch))
            version.patch = "0";
        else if (version.patch == "*")
            version.like = true;

        returnDeps.push({
            package: app,
            version: version
        });
    }

    return returnDeps;
};

self.checkDependencies = function (dependencies, success, error) {
    unirest.post(OmenAPI.buildURL('/dependency/check'))
        .type('json')
        .send({deps: dependencies})
        .end(function (response) {
            if (response.statusType == 4 || response.statusType == 5)
                return error(response.status, response.body);
            return success(response.body);
        });
};


self.publish = function (project, promptResult, success, error) {
    var archive = new AdmZip();

    archive.addLocalFolder('.', project.get('name').replace(/[\/ ]/ig, '_') + '/');
    archive.writeZip('./archive.zip');

    unirest.post(OmenAPI.buildURL('/publish/project'))
        .auth({
            user: project.get('author').email,
            pass: promptResult.Password,
            sendImmediately: true
        })
        .type('json')
        .send({omenFile: project.all()})
        .end(function (response) {
            if (response.statusType == 4 || response.statusType == 5)
                return error(response.status, response.body);
            return success(response.body);
        });
};

module.exports = self;
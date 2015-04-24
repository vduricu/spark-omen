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
    fs = require('fs'),
    path = require('path'),
    fstream = require('fstream'),
    tar = require('tar'),
    zlib = require('zlib'),
    Download = require('download'),
    Q = require("q");

var self = {};

var _isValid = function (value) {
    return value !== undefined && value !== null;
};

self.buildDependencies = function (project) {
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

self.checkDependencies = function (dependencies) {
    var deferred = Q.defer();

    unirest.post(OmenAPI.buildURL('/dependency/check'))
        .type('json')
        .send({deps: dependencies})
        .end(function (response) {
            if (response.statusType == 4 || response.statusType == 5)
                deferred.reject(new Error({status: response.status, body: response.body}));
            else
                deferred.resolve(response.body);
        });

    return deferred.promise;
};

self.downloadDependencies = function (dependencies) {
    var downloads = Download({mode: '755'}).dest('./vendor'),
        deferred = Q.defer();

    for (var i in dependencies) {
        downloads.get(dependencies[i]);
    }

    downloads.run(function (err, files) {
        if (err != null && err != undefined) {
            deferred.reject(new Error(err));
            return;
        }

        deferred.resolve(files);
    });

    return deferred.promise;
};

self.publish = function (project, promptResult) {
    var deferred = Q.defer();
    fs.readFile('.omenignore', "utf-8", function (err, data) {
        if (err) {
            deferred.reject(err);
            return;
        }

        var lines = data.split(/\n/),
            fullPath = path.resolve('.');

        var writer = fstream.Writer({'path': 'omenpackage.spk'});
        fstream.Reader({
            'path': '.',
            'type': 'Directory',
            filter: function () {
                var file = this.path.substring(fullPath.length);

                if (this.basename.match(/^\.git/) ||
                    this.basename.match(/^vendor/) ||
                    this.basename.match(/^omenpackage.spk/) ||
                    this.basename.match(/^node_modules/))
                    return false;

                for (var iLine in lines) {
                    var line = lines[iLine].trim();

                    if (this.basename.match(new RegExp(line)))
                        return false;

                    if (file.match(new RegExp(line)))
                        return false;
                }

                return true;
            }
        })
            .pipe(tar.Pack())/* Convert the directory to a .tar file */
            .pipe(zlib.Gzip())/* Compress the .tar file */
            .pipe(writer);

        writer.on("close", function () {
            unirest.post(OmenAPI.buildURL('/publish/project'))
                .headers({'Accept': 'application/json'})
                .attach('file', './omenpackage.spk') // Attachment
                .field("omenFile", project.all())
                .field("user", project.get('author').email)
                .field("pass", promptResult.Password)
                .end(function (response) {
                    console.log(response.body);
                    if (response.statusType == 4 || response.statusType == 5)
                        deferred.reject(new Error({status: response.status, body: response.body}));
                    else
                        deferred.resolve(response.body);
                });
        });
    });

    return deferred.promise;
};

module.exports = self;
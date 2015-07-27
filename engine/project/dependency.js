/**
 * Project dependency tools
 *
 * @package engine/project
 * @author valentin.duricu
 * @date 21.07.2015
 * @module project
 */
/*jslint node: true */
"use strict";

var unirest = require('unirest'),
    Download = require('download'),
    Q = require("q"),
    fs = require("fs"),
    path = require("path");

var OmenAPI = require('./../utils/omenApi');

var ProjectDependencyOmen;

/**
 * Project dependency tools
 *
 * @class
 * @return ProjectDependencyOmen
 */
ProjectDependencyOmen = function () {
    var self = this;

    /**
     * For a given project builds the dependencies list that is sent to the server.
     *
     * @param {Project} project The project for which the dependencies are being built.
     * @return Array
     */
    self.buildDependencies = function (project) {
        var versionPattern = new RegExp("^(<|>|<=|>=)?([0-9]+).((\\*|[0-9]+)(\.([0-9]+|\\*))?)$", "i"),
            returnDependencies = [],
            dependencies = project.get('dependencies'),
            i = 0;

        if (!Object.isValid(dependencies))
            return returnDependencies;

        for (var iElem in dependencies) {
            var app = iElem,
                verArr = versionPattern.exec(dependencies[iElem]),
                version = {};

            version.operator = verArr[1];
            if (!Object.isValid(version.operator))
                version.operator = "=";

            version.major = verArr[2];
            version.minor = verArr[4];
            version.patch = verArr[6];

            if (!Object.isValid(version.minor))
                version.minor = "0";
            else if (version.minor == "*")
                version.like = true;

            if (!Object.isValid(version.patch))
                version.patch = "0";
            else if (version.patch == "*")
                version.like = true;

            returnDependencies.push({
                package: app,
                version: version
            });
        }

        return returnDependencies;
    };

    /**
     * Performs a check of the dependencies on the server.
     *
     * @param {Array} dependencies The dependencies to be checked.
     * @param {Array} [update] The installed dependencies.
     * @return Promise
     */
    self.checkDependencies = function (dependencies, update) {
        var deferred = Q.defer(),
            data = {deps: dependencies},
            url = '/dependency/check';

        /**
         * In case the update command is run, we must attach the
         * installed dependencies.
         */
        if (Object.isValid(update)) {
            data.installed = update;
            url = '/dependency/update';
        }

        /* The check of the dependencies is being done on the server. */
        unirest.post(OmenAPI.buildURL(url))
            .type('json')
            .send(data)
            .end(function (response) {
                if (response.statusType == 4 || response.statusType == 5)
                    deferred.reject(new Error({status: response.status, body: response.body}));
                else
                    deferred.resolve(response.body);
            });

        return deferred.promise;
    };

    /**
     * For the given dependencies, download them and store them locally.
     *
     * @param {Array} dependencies The dependencies to be downloaded.
     * @return Promise
     */
    self.downloadDependencies = function (dependencies) {
        var downloads = (new Download({mode: '755', extract: true})).dest('./vendors'),
            deferred = Q.defer();

        /* Build the download list. */
        for (var i in dependencies) {
            downloads.get(dependencies[i]);
        }

        /* Downloads the files. */
        downloads.run(function (err, files) {
            if (Object.isValid(err)) {
                deferred.reject(new Error(err));
                return;
            }

            deferred.resolve(files);
        });

        return deferred.promise;
    };

    /**
     * Downloads a given project locally
     *
     * @param {String} project The name of the project to be downloaded.
     * @return Promise
     */
    self.downloadProject = function (project) {
        var downloads = (new Download({mode: '755', extract: true, strip: true})).dest('./' + project),
            deferred = Q.defer();

        if (!fs.existsSync(path.resolve("./" + project))) {
            downloads.get(OmenAPI.buildURL('/dependency/extend/' + project));

            /* Downloads the files. */
            downloads.run(function (err, files) {
                if (Object.isValid(err)) {
                    deferred.reject(new Error(err));
                    return;
                }

                deferred.resolve(files);
            });
        }
        else
            deferred.reject(new Error("You cannot override an existing project!"));

        return deferred.promise;
    };

    return self;
};

module.exports = new ProjectDependencyOmen();
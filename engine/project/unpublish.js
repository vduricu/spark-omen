/**
 * Project unpublish tools
 *
 * @package engine/project
 * @author valentin.duricu
 * @date 21.07.2015
 * @module project
 */
/*jslint node: true */
"use strict";

var unirest = require('unirest'),
    path = require('path'),
    fs = require('fs'),
    Q = require("q");

var OmenAPI = require('./../utils/omenApi');

var ProjectUnpublishOmen;

/**
 * Project unpublish tools
 *
 * @class
 * @return ProjectUnpublishOmen
 */
ProjectUnpublishOmen = function(){
    var self = this;

    /**
     * Unpublishes a project from the repository.
     *
     * @param {Project} project The project to be unpublished.
     * @param {Object} promptResult The password and other questions asked by the application.
     * @return Promise
     */
    self.unpublishProject = function (project, promptResult) {
        var deferred = Q.defer(),
            data = {
                name: project.get('name'),
                user: project.get('author').email,
                pass: promptResult.Password
            };

        /* The check of the dependencies is being done on the server. */
        unirest.delete(OmenAPI.buildURL('/unpublish/project'))
            .type('json')
            .send(data)
            .end(function (response) {
                if (response.statusType == 4 || response.statusType == 5)
                    deferred.reject(new Error({status: response.status, body: response.body}));
                else {
                    deferred.resolve(response.body);
                }
            });

        return deferred.promise;
    };

    /**
     * Performs a check of the dependencies on the server.
     *
     * @param {Project} project The project to be unpublished.
     * @param {String} version The version to be unpublished.
     * @param {Object} promptResult The password and other questions asked by the application.
     * @return Promise
     */
    self.unpublishVersion = function (project, version, promptResult) {
        var deferred = Q.defer(),
            data = {
                name: project.get('name'),
                version: version,
                user: project.get('author').email,
                pass: promptResult.Password
            };

        /* The check of the dependencies is being done on the server. */
        unirest.delete(OmenAPI.buildURL('/unpublish/version'))
            .type('json')
            .send(data)
            .end(function (response) {
                if (response.statusType == 4 || response.statusType == 5)
                    deferred.reject(new Error({status: response.status, body: response.body}));
                else {
                    deferred.resolve(response.body);
                }
            });

        return deferred.promise;
    };

    return self;
};


module.exports = new ProjectUnpublishOmen();
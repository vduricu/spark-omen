/**
 * Omen API calls and tools.
 *
 * @package engine\utils
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 20.04.2015
 * @module utils
 */
/*jslint node: true */
"use strict";

var unirest = require('unirest'),
    Q = require("q"),
    path = require('path'),
    fs = require('fs');

var BASE_API_PATH = "/api/v1/";

/**
 * Omen API calls and tools.
 *
 * @class
 */
var OmenAPI = {};

/**
 * Builds the URL for the used repository.
 *
 * @param {String} url The path relative to the API route.
 * @return String
 */
OmenAPI.buildURL = function (url) {
    return global.OMEN_ENV.url + (BASE_API_PATH + url).replace("\/\/", "/");
};

/**
 * Reads the user data from the .omenrc file.
 *
 * @return Object
 */
OmenAPI.readUserData = function () {
    var file = path.resolve(OmenAPI.getUserHome() + "/.omenrc");

    if (!fs.existsSync(file))
        return {};

    return JSON.parse(fs.readFileSync(file, "utf-8"));
};

/**
 * Stores the user data in the .omenrc file.
 *
 * @param {Object} userData The data to be stored.
 */
OmenAPI.storeUserData = function (userData) {
    var file = path.resolve(OmenAPI.getUserHome() + "/.omenrc");

    fs.writeFileSync(file, JSON.stringify(userData, null, 4));
};

/**
 * Does the user login in the Omen API. Stores the authorization token.
 *
 * @param {Object} data The user data.
 * @return Promise
 */
OmenAPI.doLogin = function (data) {
    var deferred = Q.defer();

    unirest.post(OmenAPI.buildURL('/login'))
        .type('json')
        .send(data)
        .end(function (response) {
            if (response.statusType == 4 || response.statusType == 5)
                deferred.reject({status: response.status, body: response.body});
            else {
                var userData = OmenAPI.readUserData();
                userData.authToken = response.body.token;
                userData.email = data.email;
                userData.name = response.body.name;
                userData.repository = global.OMEN_ENV.url;

                OmenAPI.storeUserData(userData);
                deferred.resolve(response.body);
            }
        });

    return deferred.promise;
};

/**
 * Reads the token used for the API calls.
 *
 * @return String
 */
OmenAPI.readToken = function () {
    var data = OmenAPI.readUserData();

    if (!Object.isValid(data.token))
        return "";

    return data.token;
};

/**
 * Reads the token used for the API calls.
 *
 * @return String
 */
OmenAPI.readEnv = function () {
    var data = OmenAPI.readUserData();

    if (!Object.isValid(data.env))
        return null;

    return data.env;
};

/**
 * Returns the user home directory.
 *
 * @return String
 */
OmenAPI.getUserHome = function () {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

module.exports = OmenAPI;
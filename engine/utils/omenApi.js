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


module.exports = OmenAPI;
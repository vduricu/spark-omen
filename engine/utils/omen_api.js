/**
 * Omen API calls.
 *
 * @package engine\utils
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 20.04.2015
 * @module utils/omen_api
 */

/**
 * API Calls Class
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
    return GLOBAL.OMEN_ENV.url + ("/api/v1/" + url).replace("\/\/", "/");
};

module.exports = OmenAPI;
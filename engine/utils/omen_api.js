/**
 * Omen API calls.
 *
 * @package engine\utils
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 20.04.2015
 */
var self = {};

self.buildURL = function (url) {
    return GLOBAL.OMEN_ENV.url + ("/" + url).replace("\/\/", "/");
};

module.exports = self;
/**
 * Mockup class for CLI contents.
 *
 * @package engine/utils
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 18.05.2015
 * @module engine/utils/cliMockup
 */

/*jslint node: true */
"use strict";

var CliMockup = function () {
    var _contents = [];

    this.ok = function (message) {
        _contents.push({type: "ok", message: message});
    };
    this.info = function (message) {
        _contents.push({type: "info", message: message});
    };
    this.error = function (message) {
        _contents.push({type: "error", message: message});
    };
    this.getAll = function () {
        return _contents;
    };
    this.clearAll = function () {
        _contents = [];
    };

    return this;
};

module.exports = CliMockup;
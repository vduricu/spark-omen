/**
 * Mockup class for CLI contents.
 *
 * @package engine/utils
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 18.05.2015
 * @module utils
 */

/*jslint node: true */
"use strict";

var CliMockup;

/**
 * Mockup class to be used for testing when displaying CLI messages.
 *
 * @class
 * @return CliMockup
 */
CliMockup = function () {
    var _contents = [];

    /**
     * Adds an Ok message to the message stack.
     *
     * @param {String} message The message to be displayed.
     */
    this.ok = function (message) {
        _contents.push({type: "ok", message: message});
    };

    /**
     * Adds an Info message to the message stack.
     *
     * @param {String} message The message to be displayed.
     */
    this.info = function (message) {
        _contents.push({type: "info", message: message});
    };

    /**
     * Adds an Error message to the message stack.
     *
     * @param {String} message The message to be displayed.
     */
    this.error = function (message) {
        _contents.push({type: "error", message: message});
    };

    /**
     * Returns the messages stack.
     *
     * @return Object[]
     */
    this.getAll = function () {
        return _contents;
    };

    /**
     * Clears the message stack.
     */
    this.clearAll = function () {
        _contents = [];
    };

    return this;
};

module.exports = CliMockup;
/**
 * String utils
 *
 * @package engine/utils
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 18.05.2015
 * @module utils
 */

/*jslint node: true */
"use strict";

if (typeof String.prototype.startsWith != 'function') {
    /**
     * Checks if a string starts with the given string.
     *
     * @param {String} str The string against which the checks are performed.
     *
     * @return boolean
     */
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    /**
     * Checks if a string ends with the given string.
     *
     * @param {String} str The string against which the checks are performed.
     *
     * @return boolean
     */
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}

if (typeof Object.isValid != 'function') {
    /**
     * Tests to see if a given object is valid or not.
     *
     * @param {Object} object The object to be checked.
     *
     * @return boolean
     */
    Object.isValid = function (object) {
        return object !== null && object !== undefined;
    };
}

if (typeof String.prototype.isValid != 'function') {
    /**
     * Tests to see if a given object is valid or not.
     *
     * @param {String} str The object to be checked.
     *
     * @return boolean
     */
    String.prototype.isValid = function (str) {
        return str !== null && str !== undefined && str.length !== 0;
    };
}

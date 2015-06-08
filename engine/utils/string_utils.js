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
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}
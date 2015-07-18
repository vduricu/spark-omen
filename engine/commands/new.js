/**
 * Creates a new object
 *
 * @package
 * @author valentin.duricu
 * @date 18.07.2015
 * @module
 */
/*jslint node: true */
"use strict";

var CommandOmen = require('./../base/command');

var NewOmen;

/**
 * Generic command to create a new object
 *
 * @class
 */
NewOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
NewOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 *
 * @param {String} [filename] The name of the file to be imported
 */
NewOmen.prototype.run = function (filename) {

};

module.exports = NewOmen;
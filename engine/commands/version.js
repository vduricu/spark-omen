/**
 * Display information about current version.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 16.04.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command');
var VersionOmen;

/**
 * Display information about current version.
 *
 * @class
 */
VersionOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
VersionOmen.prototype = new CommandOmen("version");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
VersionOmen.prototype.run = function (args) {
    var self = this;

    self.cli.ok('====================================================');
    self.cli.ok('          Omen (' + Spark.version() + ')');
    self.cli.ok('----------------------------------------------------');
    self.cli.ok('\tCodename: ' + Spark.codename);
    self.cli.ok('\tVersion:  ' + Spark.version());
    self.cli.ok('====================================================');

};

module.exports = VersionOmen;
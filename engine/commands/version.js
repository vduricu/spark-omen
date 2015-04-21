/**
 * Display information about current version.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 16.04.2015
 */
"use strict";

var Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command');
var VersionOmen;

/**
 * Version command constructor.
 */
VersionOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
VersionOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
VersionOmen.prototype.run = function () {
    this.cli().ok('====================================================');
    this.cli().ok('          Omen (' + Spark.version() + ')');
    this.cli().ok('----------------------------------------------------');
    this.cli().ok('\tCodename: ' + Spark.codename);
    this.cli().ok('\tVersion:  ' + Spark.version());
    this.cli().ok('====================================================');

};

module.exports = VersionOmen;
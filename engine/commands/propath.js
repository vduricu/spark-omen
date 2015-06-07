/**
 * Displays the full propath to be used in the application.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 07.06.2015
 * @module commands/propath
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    OmenAPI = require('./../utils/omen_api');
var PropathOmen;

/**
 * Propath command constructor.
 *
 * @class
 */
PropathOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
PropathOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
PropathOmen.prototype.run = function () {
    var lock = new Project('omen.lock');

    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - ProPath value:');
    this.cli().ok('----------------------------------------------------');
    this.cli().ok(OmenAPI.propath(lock));
    this.cli().ok('====================================================');
};


module.exports = PropathOmen;
/**
 * Checks the given project.json file.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 16.04.2015
 */
"use strict";

var Project = require('./../models/project'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command');
var CheckOmen;

/**
 * Check command constructor.
 */
CheckOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
CheckOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
CheckOmen.prototype.run = function (filename) {
    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project checking:');
    this.cli().ok('----------------------------------------------------');

    var project = new Project(filename);

    try {
        project.check();
        this.cli().ok("The file has passed the checks!");
    } catch (err) {
        this.cli().error("The following error has been triggered:");
        this.cli().error("    - " + err.message);
    }

    this.cli().ok('====================================================');
};


module.exports = CheckOmen;
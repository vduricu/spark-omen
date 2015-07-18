/**
 * Eclipse project tools
 *
 * @package engine/commands
 * @author valentin.duricu
 * @date 15.07.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Spark = require('./../base/spark'),
    Project = require('./../project/project'),
    CommandOmen = require('./../base/command'),
    EclipseUtils = require('./../utils/eclipse_utils');

var EclipseOmen;

/**
 * Handles all things related to the Eclipse projects.
 *
 * @class
 */
EclipseOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
EclipseOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 *
 * @param {String} filename The name of the file to be installed.
 */
EclipseOmen.prototype.run = function (filename) {
    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Eclipse toolkit:');
    this.cli().ok('----------------------------------------------------');

    var self = this;
    var args = GLOBAL.OMEN_CLI_ARGS;
    var eclipseCommand = "";
    var project = new Project(filename);

    for (var i = 0; i < args.length; i++) {
        if (args[i] == "eclipse") {
            eclipseCommand = args[i + 1];
            if (eclipseCommand === null || eclipseCommand === undefined || eclipseCommand.length === 0)
                throw new Error("No tool specified!");
        }
    }

    switch (eclipseCommand) {
        case "init":
            this.cli().ok("Initializing eclipse project");
            EclipseUtils.initProject(project);
            break;

        case "update":
            this.cli().ok("Updating eclipse project... Project files will be overwritten!");
            EclipseUtils.updateProject(project);
            break;
        default:
            this.cli().info('Command not available');
    }
};

module.exports = EclipseOmen;
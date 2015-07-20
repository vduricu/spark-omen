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
EclipseOmen.prototype = new CommandOmen("eclipse");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
EclipseOmen.prototype.run = function (args) {
    var self = this,
        eclipseCommand = "",
        project = new Project(self.filename);

    self.cli.header('Eclipse toolkit');

    for (var i = 0; i < args.length; i++) {
        if (args[i] == self.commandName) {
            eclipseCommand = args[i + 1];
            if (!Object.isValid(eclipseCommand) || eclipseCommand.length === 0)
                throw new Error("No tool specified!");
        }
    }

    switch (eclipseCommand) {
        case "init":
            self.cli.ok("Initializing eclipse project");
            EclipseUtils.initProject(project);
            break;

        case "update":
            self.cli.ok("Updating eclipse project... Project files will be overwritten!");
            EclipseUtils.updateProject(project);
            break;
        default:
            self.cli.info('Command not available');
    }
};

module.exports = EclipseOmen;
/**
 * Downloads an existing project such that the user can extend it.
 *
 * @package engine/commands
 * @author valentin
 * @date 27.07.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var CommandOmen = require('./../base/command'),
    DependencyOmen = require('./../project/dependency');
var ExtendOmen;

/**
 * Downloads an existing project such that the user can extend it.
 *
 * @class
 */
ExtendOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
ExtendOmen.prototype = new CommandOmen("extend");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
ExtendOmen.prototype.run = function (args) {
    var self = this,
        projectName = "";

    self.cli.header('Downloading project');

    for (var i = 0; i < args.length; i++) {
        if (args[i] == self.commandName)
            continue;

        projectName = args[i].trim();
        break;
    }

    if (!Object.isValid(projectName) || projectName.length === 0)
        throw new Error("Project name not specified!");


    DependencyOmen.downloadProject(projectName).then(function (response) {
        self.cli.ok("Project downloaded.");
        self.cli.end();
    }, function (error) {
        self.cli.error(error.message);
        self.cli.end();
    });

};

module.exports = ExtendOmen;

/**
 * Unpublish a package/version from the repository.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 16.07.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    ProjectUtils = require('./../utils/project_utils'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    fs = require("fs"),
    path = require("path"),
    prompt = require('prompt');

var UnpublishOmen;

/**
 * Unpublish a package/version from the repository.
 *
 * @class
 */
UnpublishOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
UnpublishOmen.prototype = new CommandOmen("unpublish");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
UnpublishOmen.prototype.run = function (args) {
    var self = this,
        unpublishCommand = "",
        versionUnpublish = "",
        project = new Project(self.filename);

    var properties = [
        {
            name: 'Password',
            hidden: true,
            required: true
        }
    ];

    prompt.start();

    self.cli.header("Project unpublishing");
    self.cli.info("Reading project information");

    for (var iArgs = 0; iArgs < args.length; iArgs++) {
        if (args[iArgs] == self.commandName) {
            unpublishCommand = args[iArgs + 1];
            if (!Object.isValid(unpublishCommand) || unpublishCommand.length === 0)
                throw new Error("What do you want to unpublish? (Version, Project)");
        }
    }

    switch (unpublishCommand) {
        case "project":
            self.cli.ok("Checking and unpublishing project");
            prompt.get(properties, function (err, result) {
                if (err) {
                    throw new Error(err);
                }

                ProjectUtils.unpublishProject(project, result).then(function (res) {
                    self.cli.ok("The project has been unpublished.");
                    self.cli.end();
                }, function (err) {
                    ProjectUtils.installError(self.cli, err);
                });
            });

            break;

        case "version":
            for (var iVersion = 0; iVersion < args.length; iVersion++) {
                if (args[iVersion] == "version") {
                    versionUnpublish = args[iVersion + 1];
                    if (!Object.isValid(versionUnpublish) || versionUnpublish.length === 0)
                        versionUnpublish = project.get('version');
                }
            }

            self.cli.ok("Checking and unpublishing version");

            prompt.get(properties, function (err, result) {
                if (err) {
                    throw new Error(err);
                }

                ProjectUtils.unpublishVersion(project, versionUnpublish, result).then(function (res) {
                    self.cli.ok("The version (" + versionUnpublish + ") has been unpublished.");
                    self.cli.end();
                }, function (err) {
                    ProjectUtils.installError(self.cli, err);
                });
            });

            break;
        default:
            self.cli.info('Command not available');
    }

};

module.exports = UnpublishOmen;
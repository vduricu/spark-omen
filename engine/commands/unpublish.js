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
UnpublishOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 *
 * @param {String} filename The name of the file to be installed.
 */
UnpublishOmen.prototype.run = function (filename) {
    var properties = [
        {
            name: 'Password',
            hidden: true,
            required: true
        }
    ];

    prompt.start();

    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project unpublishing:');
    this.cli().ok('----------------------------------------------------');
    this.cli().info("Reading project information");

    var self = this;
    var args = GLOBAL.OMEN_CLI_ARGS;
    var unpublishCommand = "";
    var versionUnpublish = "";
    var project = new Project(filename);

    for (var iArgs = 0; iArgs < args.length; iArgs++) {
        if (args[iArgs] == "unpublish") {
            unpublishCommand = args[iArgs + 1];
            if (unpublishCommand === null || unpublishCommand === undefined || unpublishCommand.length === 0)
                throw new Error("What do you want to unpublish? (Version, Project)");
        }
    }

    switch (unpublishCommand) {
        case "project":
            this.cli().ok("Checking and unpublishing project");
            prompt.get(properties, function (err, result) {
                if (err) {
                    throw new Error(err);
                }

                ProjectUtils.unpublishProject(project, result).then(function (res) {
                    self.cli().ok("The project has been unpublished.");
                    self.cli().ok('====================================================');
                }, function (err) {
                    ProjectUtils.installError(self.cli(), err);
                });
            });

            break;

        case "version":
            for (var iVersion = 0; iVersion < args.length; iVersion++) {
                if (args[iVersion] == "version") {
                    versionUnpublish = args[iVersion + 1];
                    if (versionUnpublish === null || versionUnpublish === undefined || versionUnpublish.length === 0)
                        versionUnpublish = project.get('version');
                }
            }

            this.cli().ok("Checking and unpublishing version");

            prompt.get(properties, function (err, result) {
                if (err) {
                    throw new Error(err);
                }

                ProjectUtils.unpublishVersion(project, versionUnpublish, result).then(function (res) {
                    self.cli().ok("The version (" + versionUnpublish + ") has been unpublished.");
                    self.cli().ok('====================================================');
                }, function (err) {
                    ProjectUtils.installError(self.cli(), err);
                });
            });

            break;
        default:
            this.cli().info('Command not available');
    }

};

module.exports = UnpublishOmen;
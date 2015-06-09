/**
 * Creates a package with the current project.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 09.06.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    ProjectUtils = require('./../utils/project_utils'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    fs = require("fs");

var PackOmen;

/**
 * Creates a package with the current project.
 *
 * @class
 */
PackOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
PackOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 *
 * @param {String} filename The name of the file to be published.
 */
PackOmen.prototype.run = function (filename) {
    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project packing:');
    this.cli().ok('----------------------------------------------------');
    this.cli().info("Reading project information");

    var project = new Project(filename),
        self = this;

    this.cli().info("Checking project file");
    project.check();

    this.cli().info("Building dependencies");
    var dependencies = ProjectUtils.buildDependencies(project);

    this.cli().info("Checking dependencies");

    ProjectUtils.checkDependencies(dependencies).then(function (res) {
        if (res.status == "error") {
            self.cli().error("There were some errors:");
            for (var errorLine in res.errors) {
                var line = res.errors[errorLine];
                if (line.available !== null && line.available !== undefined)
                    self.cli().error("   - " + errorLine + ": " + line.message + " (Available: " + line.available + ")");
                else
                    self.cli().error("   - " + errorLine + ": " + line.message);
            }

            return;
        }

        ProjectUtils.pack(project).then(function (archiveName) {
            self.cli().ok("Package [" + archiveName + "] created");
            self.cli().ok('====================================================');
        });
    });
};


module.exports = PackOmen;
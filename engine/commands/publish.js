/**
 * Publishes the current project to the configured omen repository.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 16.04.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    ProjectUtils = require('./../utils/project_utils'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    fs = require("fs"),
    prompt = require('prompt');

var PublishOmen;

/**
 * Publishes the current project to the configured omen repository.
 *
 * @class
 */
PublishOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
PublishOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 *
 * @param {String} filename The name of the file to be published.
 */
PublishOmen.prototype.run = function (filename) {
    var properties = [
        {
            name: 'Password',
            hidden: true
        }
    ];

    var args = GLOBAL.OMEN_CLI_ARGS;
    var whatToDo = "new";

    for (var i = 0; i < args.length; i++) {
        if (args[i] == "publish") {
            whatToDo = args[i + 1];
            if (whatToDo === null || whatToDo === undefined)
                whatToDo = "new";
        }
    }

    prompt.start();

    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project publication:');
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

        prompt.get(properties, function (err, result) {
            if (err) {
                throw new Error(err);
            }

            ProjectUtils.publish(whatToDo, project, result).then(function (result) {
                if (result.status == "update")
                    self.cli().ok("Package updated!");
                else
                    self.cli().ok("Packages published");

                self.cli().ok('====================================================');
            }, function (err) {
                if (err.body !== null) {
                    if (err.body.error !== null && err.body.error !== undefined)
                        self.cli().error(err.body.error.message);
                    else
                        self.cli().error(err.body.message);
                }
                self.cli().error('====================================================');
            });
        });
    });
};


module.exports = PublishOmen;
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
    ProjectUtils = require('./../utils/projectUtils'),
    CommandOmen = require('./../base/command'),
    fs = require("fs"),
    OmenAPI = require('./../utils/omenApi');

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
PublishOmen.prototype = new CommandOmen("publish");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
PublishOmen.prototype.run = function (args) {
    var self = this,
        project = new Project(self.filename),
        authToken = OmenAPI.readToken();

    self.cli.header("Project publication");

    if (!Object.isValid(authToken) || authToken.length === 0) {
        throw new Error("You cannot publish a project without authorization!\nUse `omen adduser` to authorize yourself!");
    }

    self.cli.info("Reading project information");

    self.cli.info("Checking project file");
    project.check();

    self.cli.info("Building dependencies");
    var dependencies = ProjectUtils.buildDependencies(project);

    self.cli.info("Checking dependencies");

    ProjectUtils.checkDependencies(dependencies).then(function (res) {
        if (res.status == "error") {
            self.cli.error("There were some errors:");
            for (var errorLine in res.errors) {
                var line = res.errors[errorLine];
                if (Object.isValid(line.available))
                    self.cli.error("   - " + errorLine + ": " + line.message + " (Available: " + line.available + ")");
                else
                    self.cli.error("   - " + errorLine + ": " + line.message);
            }

            return;
        }


        ProjectUtils.publish(project, authToken).then(function (result) {
            if (result.status == "update")
                self.cli.ok("Package updated!");
            else
                self.cli.ok("Packages published");

            self.cli.end();
        }, function (err) {
            if (Object.isValid(err.body)) {
                if (Object.isValid(err.body.error !== null && err.body.error !== undefined))
                    self.cli.error(err.body.error.message);
                else
                    self.cli.error(err.body.message);
            }
            self.cli.end();
        });
    }, function (err) {
        if (Object.isValid(err.body)) {
            if (Object.isValid(err.body.error !== null && err.body.error !== undefined))
                self.cli.error(err.body.error.message);
            else
                self.cli.error(err.body.message);
        }
        self.cli.end();
    });
};


module.exports = PublishOmen;
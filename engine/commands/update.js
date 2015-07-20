/**
 * Updates the project with the dependencies defined in the project.json file.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 28.04.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    ProjectUtils = require('./../utils/project_utils'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    fs = require("fs");

var UpdateOmen;

/**
 * Updates the project with the dependencies defined in the project.json file.
 *
 * @class
 */
UpdateOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
UpdateOmen.prototype = new CommandOmen("update");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
UpdateOmen.prototype.run = function (args) {
    var self = this,
        project = new Project(self.filename),
        lock = new Project('omen.lock');

    self.cli.header('Project update');
    self.cli.info("Reading project information");

    if (self.filename != lock.get('file')) {
        self.cli.error("The file used to install the project differs from the one used for update.");
        return;
    }

    project.executePre(self.commandName);

    self.cli.info("Checking project file");
    project.check();

    self.cli.info("Building dependencies");
    var dependencies = ProjectUtils.buildDependencies(project);

    self.cli.info("Checking dependencies");

    var omenLock = {};
    omenLock.file = project.getFilename();
    omenLock.name = project.get('name');
    omenLock.version = project.get('version');
    omenLock.packages = lock.get('packages');

    if (dependencies.length === 0) {
        project.executePost(self.commandName);
        return ProjectUtils.omenLockWrite(self.cli, omenLock);
    }

    ProjectUtils.checkDependencies(dependencies, omenLock.packages).then(function (res) {
        ProjectUtils.install(omenLock, self.cli, res);

        project.executePost(self.commandName);
    }, function (err) {
        ProjectUtils.installError(self.cli, err);
    });

};

module.exports = UpdateOmen;
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
UpdateOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 *
 * @param {String} filename The name of the file to be installed.
 */
UpdateOmen.prototype.run = function (filename) {
    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project update:');
    this.cli().ok('----------------------------------------------------');
    this.cli().info("Reading project information");

    var project = new Project(filename),
        lock = new Project('omen.lock'),
        self = this;

    if (filename != lock.get('file')) {
        this.cli().error("The file used to install the project differs from the one used for update.");
        return;
    }

    project.executePre('update');

    this.cli().info("Checking project file");
    project.check();

    this.cli().info("Building dependencies");
    var dependencies = ProjectUtils.buildDependencies(project);

    this.cli().info("Checking dependencies");

    var omenLock = {};
    omenLock.file = project.getFilename();
    omenLock.name = project.get('name');
    omenLock.version = project.get('version');
    omenLock.packages = lock.get('packages');

    if (dependencies.length === 0) {
        return ProjectUtils.omenLockWrite(this.cli(), omenLock);
    }

    ProjectUtils.checkDependencies(dependencies, omenLock.packages).then(function (res) {
        ProjectUtils.install(omenLock, self.cli(), res);

        project.executePost('update');
    }, function (err) {
        ProjectUtils.installError(self.cli(), err);
    });

};

module.exports = UpdateOmen;
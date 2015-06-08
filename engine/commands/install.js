/**
 * Installs the dependencies defined in the project.json file.
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
    fs = require("fs");

var InstallOmen;

/**
 * Installs the dependencies defined in the project.json file.
 *
 * @class
 */
InstallOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
InstallOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 *
 * @param {String} filename The name of the file to be installed.
 */
InstallOmen.prototype.run = function (filename) {
    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project installation:');
    this.cli().ok('----------------------------------------------------');
    this.cli().info("Reading project information");

    var project = new Project(filename),
        self = this;

    this.cli().info("Checking project file");
    project.check();

    this.cli().info("Building dependencies");
    var deps = ProjectUtils.buildDependencies(project);

    this.cli().info("Checking dependencies");

    var omenLock = {};
    omenLock.file = project.getFilename();
    omenLock.name = project.get('name');
    omenLock.version = project.get('version');
    omenLock.packages = {};

    if (deps.length === 0) {
        return ProjectUtils.omenLockWrite(self.cli(), omenLock);
    }

    ProjectUtils.checkDependencies(deps).then(function (res) {
        ProjectUtils.install(omenLock, self.cli(), res);
    }, function (err) {
        ProjectUtils.installError(self.cli(), err);
    });


};


module.exports = InstallOmen;
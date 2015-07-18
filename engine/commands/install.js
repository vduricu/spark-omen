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
    fs = require("fs"),
    path = require("path");

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
        projectCopy = new Project(filename),
        self = this,
        args = GLOBAL.OMEN_CLI_ARGS,
        omenLock = {};

    omenLock.file = project.getFilename();
    omenLock.name = project.get('name');
    omenLock.version = project.get('version');
    omenLock.packages = {};

    if (fs.existsSync(path.resolve('omen.lock'))) {
        var locks = new Project('omen.lock');

        omenLock.packages = locks.get('packages');
    }

    for (var i = 0; i < args.length; i++) {
        if (args[i] == "install")
            continue;

        if(!project.hasDependency(args[i]))
            project.addDependency(args[i], project.MAX_VERSION);
    }

    project.executePre('install');

    var proDeps = project.get('dependencies');
    for (var iDeps in proDeps) {
        if (omenLock.packages[iDeps] !== undefined &&
            omenLock.packages[iDeps] !== null &&
            omenLock.packages[iDeps].length !== 0)
            delete proDeps[iDeps];
    }

    projectCopy.setDependency(proDeps);

    this.cli().info("Checking project file");
    project.check();

    this.cli().info("Building dependencies");
    var deps = ProjectUtils.buildDependencies(projectCopy);

    if (deps.length === 0) {
        project.executePost('install');
        return ProjectUtils.omenLockWrite(self.cli(), omenLock);
    }

    if(GLOBAL.OMEN_SAVE)
        GLOBAL.OMEN_PROJECT = project;

    this.cli().info("Checking dependencies");

    ProjectUtils.checkDependencies(deps).then(function (res) {
        ProjectUtils.install(omenLock, self.cli(), res);

        project.executePost('install');
    }, function (err) {
        ProjectUtils.installError(self.cli(), err);
    });

};

module.exports = InstallOmen;
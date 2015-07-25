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
    ProjectUtils = require('./../utils/projectUtils'),
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
InstallOmen.prototype = new CommandOmen("install");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
InstallOmen.prototype.run = function (args) {
    var self = this,
        project = new Project(self.filename),
        projectCopy = new Project(self.filename),
        omenLock = {};

    self.cli.header('Project installation');
    self.cli.info("Reading project information");

    omenLock.file = project.getFilename();
    omenLock.name = project.get('name');
    omenLock.version = project.get('version');
    omenLock.packages = {};

    if (fs.existsSync(path.resolve('omen.lock'))) {
        var locks = new Project('omen.lock');

        omenLock.packages = locks.get('packages');
    }

    for (var i = 0; i < args.length; i++) {
        if (args[i] == self.commandName)
            continue;

        if (!project.hasDependency(args[i]))
            project.addDependency(args[i], project.MAX_VERSION);
    }

    project.executePre(self.commandName, function () {
        var proDeps = project.get('dependencies');
        for (var iDeps in proDeps) {
            if (omenLock.packages[iDeps] !== undefined &&
                omenLock.packages[iDeps] !== null &&
                omenLock.packages[iDeps].length !== 0)
                delete proDeps[iDeps];
        }

        projectCopy.setDependency(proDeps);

        self.cli.info("Checking project file");
        project.check();

        self.cli.info("Building dependencies");
        var deps = ProjectUtils.buildDependencies(projectCopy);

        if (deps.length === 0) {
            project.executePost(self.commandName);
            return ProjectUtils.omenLockWrite(self.cli, omenLock);
        }

        if (global.OMEN_SAVE)
            global.OMEN_PROJECT = project;

        self.cli.info("Checking dependencies");

        ProjectUtils.checkDependencies(deps).then(function (res) {
            ProjectUtils.install(omenLock, self.cli, res);

            project.executePost(self.commandName);
        }, function (err) {
            ProjectUtils.installError(self.cli, err);
        });
    });
};

module.exports = InstallOmen;
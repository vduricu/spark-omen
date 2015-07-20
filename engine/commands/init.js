/**
 * Initiates a new project inside an existing folder.
 *
 * @package engine\commands
 * @author valentin.duricu
 * @date 15.07.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    ProjectUtils = require('./../utils/project_utils'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    EclipseUtils = require('./../utils/eclipse_utils'),
    fs = require("fs"),
    path = require("path");

var InitOmen;

/**
 * Initiates a new project inside an existing folder.
 *
 * @class
 */
InitOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
InitOmen.prototype = new CommandOmen("init");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
InitOmen.prototype.run = function (args) {
    var self = this,
        projectName = "";

    self.cli.header('Project init');

    for (var i = 0; i < args.length; i++) {
        if (args[i] == self.commandName) {
            projectName = args[i + 1];
            if (!Object.isValid(projectName) || projectName.length === 0)
                projectName = 'omen-sample';
        }
    }

    if (fs.existsSync(path.resolve(self.filename)))
        throw new Error("Project already initialized!");

    if (!Object.isValid(projectName) || projectName.length === 0)
        throw new Error("No name specified!");

    projectName = projectName.replace(/[ -\/\\:;\.,]/ig, "_");

    self.cli.info("Creating project '" + projectName + "'");

    var omenFile = {};
    omenFile.name = projectName;
    omenFile.version = "0.1.1";
    omenFile.author = {
        name: "Author",
        email: "author@email.domain"
    };

    ProjectUtils.omenJsonInit(self.cli, omenFile);

    if(global.OMEN_ECLIPSE){
        EclipseUtils.initProject(omenFile);
    }
};


module.exports = InitOmen;
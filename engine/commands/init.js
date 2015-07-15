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
InitOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
InitOmen.prototype.run = function () {
    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project init:');
    this.cli().ok('----------------------------------------------------');

    var self = this;
    var args = GLOBAL.OMEN_CLI_ARGS;
    var projectName = "";

    for (var i = 0; i < args.length; i++) {
        if (args[i] == "init") {
            projectName = args[i + 1];
            if (projectName === null || projectName === undefined || projectName.length === 0)
                projectName = 'omen-sample';
        }
    }

    if (fs.existsSync(path.resolve('project.json')))
        throw new Error("Project already initialized!");

    if (projectName === null || projectName === undefined || projectName.length === 0)
        throw new Error("No name specified!");

    projectName = projectName.replace(/[ -\/\\:;\.,]/ig, "_");

    this.cli().info("Creating project '" + projectName + "'");

    var omenFile = {};
    omenFile.name = projectName;
    omenFile.version = "0.1.1";
    omenFile.author = {
        name: "Author",
        email: "author@email.domain"
    };

    ProjectUtils.omenJsonInit(self.cli(), omenFile);

    if(GLOBAL.OMEN_ECLIPSE){
        EclipseUtils.initProject(omenFile);
    }
};


module.exports = InitOmen;
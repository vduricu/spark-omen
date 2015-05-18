/**
 * Creates a new project in the current directory.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 17.05.2015
 * @module commands/create
 */
/*jslint node: true */
"use strict";

var Project      = require('./../project/project'),
    ProjectUtils = require('./../utils/project_utils'),
    Spark        = require('./../base/spark'),
    CommandOmen  = require('./../base/command'),
    fs           = require("fs");

var CreateOmen;

/**
 * Create command constructor.
 *
 * @class
 */
CreateOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
CreateOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
CreateOmen.prototype.run = function () {
    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project creation:');
    this.cli().ok('----------------------------------------------------');

    var self = this;
    var args = GLOBAL.OMEN_CLI_ARGS;
    var projectName = "";

    for (var i = 0; i < args.length; i++) {
        if (args[i] == "create") {
            projectName = args[i + 1];
            if (projectName === null || projectName === undefined || projectName.length === 0)
                throw new Error("No name specified!");
        }
    }

    projectName = projectName.replace(/[ -\/\\:;\.,]/ig, "_");

    this.cli().info("Creating project '" + projectName + "'");

    /* Check the existence of the vendors folder and create if it doesn't.*/
    if (fs.existsSync("./" + projectName))
        throw new Error("Project already exists!");

    fs.mkdirSync("./" + projectName);

    var omenFile = {};
    omenFile.name = projectName;
    omenFile.version = "0.1.1";
    omenFile.author = {
        name: "Author",
        email: "author@email.domain"
    };

    ProjectUtils.omenJsonWrite(self.cli(), omenFile);

};


module.exports = CreateOmen;
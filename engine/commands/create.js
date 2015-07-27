/**
 * Creates a new project in the current directory.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 17.05.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    ProjectUtils = require('./../utils/projectUtils'),
    CommandOmen = require('./../base/command'),
    EclipseUtils = require('./../utils/eclipseToolkit'),
    OmenAPI = require('./../utils/omenApi'),
    fs = require("fs");

var CreateOmen;

/**
 * Creates a new project in the current directory.
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
CreateOmen.prototype = new CommandOmen("create");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
CreateOmen.prototype.run = function (args) {
    var self = this,
        projectName = "";

    self.cli.header('Project creation');

    for (var i = 0; i < args.length; i++) {
        if (args[i] == self.commandName) {
            projectName = args[i + 1];
            if (!Object.isValid(projectName) || projectName.length === 0)
                throw new Error("No name specified!");
        }
    }

    if (!Object.isValid(projectName) || projectName.length === 0)
        throw new Error("No name specified!");

    projectName = projectName.replace(/[ -\/\\:;\.,]/ig, "_");

    self.cli.info("Creating project '" + projectName + "'");

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

    var userData = OmenAPI.readUserData();
    if (Object.isValid(userData.name) && userData.name.length !== 0)
        omenFile.author.name = userData.name;
    if (Object.isValid(userData.email) && userData.email.length !== 0)
        omenFile.author.email = userData.email;

    if (!global.OMEN_FAST_CREATE)
        return ProjectUtils.nonFastCreate(omenFile, function () {
            ProjectUtils.omenJsonWrite(self.cli, omenFile);

            if (global.OMEN_ECLIPSE) {
                EclipseUtils.setBasePath("./" + projectName + "/");
                EclipseUtils.initProject(omenFile);
            }
        });

    ProjectUtils.omenJsonWrite(self.cli, omenFile);

    if (global.OMEN_ECLIPSE) {
        EclipseUtils.setBasePath("./" + projectName + "/");
        EclipseUtils.initProject(omenFile);
    }

};


module.exports = CreateOmen;
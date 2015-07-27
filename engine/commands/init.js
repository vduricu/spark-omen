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
    ProjectUtils = require('./../utils/projectUtils'),
    CommandOmen = require('./../base/command'),
    EclipseUtils = require('./../utils/eclipseToolkit'),
    OmenAPI = require('./../utils/omenApi'),
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
                projectName = null;
        }
    }

    if (fs.existsSync(path.resolve(self.filename)))
        throw new Error("Project already initialized!");

    if (!Object.isValid(projectName) || projectName.length === 0)
        projectName = path.basename(path.resolve('.'));

    projectName = projectName.replace(/[ -\/\\:;\.,]/ig, "_");

    self.cli.info("Creating project '" + projectName + "'");

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
        return ProjectUtils.nonFastCreate(omenFile, function(){
            ProjectUtils.omenJsonInit(self.cli, omenFile);

            if (global.OMEN_ECLIPSE)
                EclipseUtils.initProject(omenFile);
        });

    ProjectUtils.omenJsonInit(self.cli, omenFile);

    if (global.OMEN_ECLIPSE)
        EclipseUtils.initProject(omenFile);

};


module.exports = InitOmen;
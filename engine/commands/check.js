/**
 * Checks the given project.json file.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 16.04.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    ProjectUtils = require('./../utils/project_utils');
var CheckOmen;


var _checks = {};

/**
 * Checks the dependencies on the repository.
 *
 * @param {Project} project The project to be checked.
 * @param {cli} cli The reference to the CLI object.
 */
_checks.dependencies = function (project, cli) {
    cli.info("Building dependencies");
    var dependencies = ProjectUtils.buildDependencies(project);

    cli.info("Checking dependencies");

    ProjectUtils.checkDependencies(dependencies).then(function (res) {
        if (res.status == "error") {
            cli.error("There were some errors:");
            for (var errorLine in res.errors) {
                var line = res.errors[errorLine];
                if (Object.isValid(line.available))
                    cli.error("   - " + errorLine + ": " + line.message + " (Available: " + line.available + ")");
                else
                    cli.error("   - " + errorLine + ": " + line.message);
            }

            return;
        }

        cli.ok("The file has passed the dependency checks!");

    }, function (err) {
        cli.error("Got error: " + err.message.body.message);
        cli.ok('====================================================');
    });
};

/**
 * Checks the information related to the project.
 *
 * @param {Project} project The project to be checked.
 * @param {cli} cli The reference to the CLI object.
 */
_checks.information = function (project, cli) {
    project.check();
    cli.ok("The file has passed the information checks!");
};

/**
 * Checks the given project.json file.
 *
 * @class
 */
CheckOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
CheckOmen.prototype = new CommandOmen("check");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command.
 */
CheckOmen.prototype.run = function (args) {

    var self = this,
        project = new Project(self.filename);

    self.cli.header("Project checking");

    try {
        var checks = [];
        for (var iArg in args) {
            var argument = args[iArg].trim();

            if (argument == "dependencies" || argument == "all")
                checks.push("dependencies");

            if (argument == "information" || argument == "all")
                checks.push("information");
        }

        if (checks.length === 0)
            checks.push("information");

        for (var iCheck in checks) {
            _checks[checks[iCheck]](project, self.cli);
        }

    } catch (err) {
        self.cli.error("The following error has been triggered:");
        self.cli.error("    - " + err.message);
    }

};


module.exports = CheckOmen;
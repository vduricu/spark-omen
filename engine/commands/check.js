/**
 * Checks the given project.json file.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 16.04.2015
 * @module commands/check
 */
"use strict";

var Project = require('././project'),
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
    var deps = ProjectUtils.buildDependencies(project);

    cli.info("Checking dependencies");

    ProjectUtils.checkDependencies(deps).then(function (res) {
        if (res.status == "error") {
            cli.error("There were some errors:");
            for (var errorLine in res.errors) {
                var line = res.errors[errorLine];
                if (line.available != null && line.available != undefined)
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
 * Check command constructor.
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
CheckOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
CheckOmen.prototype.run = function (filename) {
    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project checking:');
    this.cli().ok('----------------------------------------------------');

    var project = new Project(filename);

    try {
        var checks = [];
        for (var i in GLOBAL.OMEN_CLI_ARGS) {
            var argument = GLOBAL.OMEN_CLI_ARGS[i].trim();

            if (argument == "dependencies" || argument == "all")
                checks.push("dependencies");

            if (argument == "information" || argument == "all")
                checks.push("information");
        }

        if (checks.length == 0)
            checks.push("information");

        for (var i in checks) {
            _checks[checks[i]](project, this.cli());
        }

    } catch (err) {
        this.cli().error("The following error has been triggered:");
        this.cli().error("    - " + err.message);
    }

};


module.exports = CheckOmen;
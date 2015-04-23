/**
 * Installs the dependencies defined in the project.json file.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 16.04.2015
 */
"use strict";

var Project = require('./../models/project'),
    ProjectUtils = require('./../utils/project_utils'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    Download = require('download'),
    fs = require("fs");

var InstallOmen;

/**
 * Install command constructor.
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
    var deps = ProjectUtils.buildDependencies(project, this.cli());

    this.cli().info("Checking dependencies");

    ProjectUtils.checkDependencies(deps, function (res) {

        if (res.status == "error") {
            self.cli().error("There were some errors:");
            for (var errorLine in res.errors) {
                var line = res.errors[errorLine];
                if (line.available != null && line.available != undefined)
                    self.cli().error("   - " + errorLine + ": " + line.message + "(Available: " + line.available + ")");
                else
                    self.cli().error("   - " + errorLine + ": " + line.message);
            }

            return;
        }

        if (!fs.existsSync("./vendor"))
            fs.mkdirSync("./vendor");

        if (res.dependencies != null && res.dependencies != undefined) {
            var downloads = Download({mode: '755', extract: true}).dest('./vendor');

            for (var i in res.dependencies) {
                downloads.get(res.dependencies[i]);
            }

            self.cli().info("Downloading files");

            downloads.run(function (err, files) {
                if (err != null && err != undefined) {
                    self.cli().error(err);
                    self.cli().ok('====================================================');
                }

                self.cli().ok("Packages installed");
                self.cli().ok('====================================================');
            });
        }

    }, function (code, err) {
        console.log(JSON.stringify(err));
        self.cli().error("Got HTTP: " + code);
        self.cli().ok('====================================================');
    });


};


module.exports = InstallOmen;
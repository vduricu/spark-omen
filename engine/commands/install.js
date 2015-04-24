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
    Decompress = require("decompress"),
    fs = require("fs"),
    path = require("path");

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
    var deps = ProjectUtils.buildDependencies(project);

    this.cli().info("Checking dependencies");

    var omenLock = {};
    omenLock.file = project.getFilename();
    omenLock.packages = {};

    var omenLockWrite = function () {
        self.cli().ok("Writing omen.lock file...");
        fs.writeFile(path.resolve("./omen.lock"), JSON.stringify(omenLock, null, 4));
    };
    if (deps.length == 0) {
        return omenLockWrite();
    }

    ProjectUtils.checkDependencies(deps).then(function (res) {
        if (res.status == "error") {
            self.cli().error("There were some errors:");
            for (var errorLine in res.errors) {
                var line = res.errors[errorLine];
                if (line.available != null && line.available != undefined)
                    self.cli().error("   - " + errorLine + ": " + line.message + " (Available: " + line.available + ")");
                else
                    self.cli().error("   - " + errorLine + ": " + line.message);
            }

            return;
        }

        if (!fs.existsSync("./vendor"))
            fs.mkdirSync("./vendor");

        if (res.dependencies != null && res.dependencies != undefined) {
            self.cli().info("Downloading files");

            ProjectUtils.downloadDependencies(res.dependencies).then(function (files) {
                    var fullPath = path.resolve('./vendor/');

                    for (var i in res.packages) {
                        omenLock.packages[res.packages[i].package] = res.packages[i].version;
                    }

                    omenLockWrite();

                    for (var i in files) {
                        Decompress({mode: '755'})
                            .src(files[i].path)
                            .dest(fullPath)
                            .use(Decompress.targz({strip: 1}))
                            .run(function (err, archFiles) {
                                var pack = res.packages[files[i].path.substring(fullPath.length + 1)];

                                if (err) {
                                    self.cli().error("Problems installing: " + pack.package + " (version: " + pack.version + ") - ");
                                    self.cli().error(err);
                                    return;
                                }

                                self.cli().ok("Package: " + pack.package + " (version: " + pack.version + ") - Installed");
                            });
                    }
                },
                function (err) {
                    self.cli().error(err.message);
                    self.cli().ok('====================================================');
                });
        }
        else
            omenLockWrite();

    }, function (err) {
        console.log(JSON.stringify(err.message.body));
        self.cli().error("Got HTTP: " + err.message.status);
        self.cli().ok('====================================================');
    });


};


module.exports = InstallOmen;
/**
 * Project manipulation utilities. Installs the dependencies defined in the project.json file.
 *
 * @package engine\utils
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 20.04.2015
 * @module utils
 */
/*jslint node: true */
"use strict";

var fs = require('fs'),
    path = require('path'),
    Q = require("q");


var ProjectDependencyOmen = require('./../project/dependency'),
    ProjectPublishOmen = require('./../project/publish'),
    ProjectUnpublishOmen = require('./../project/unpublish'),
    OmenAPI = require('./omenApi');

/**
 * Project manipulation utilities. Installs the dependencies defined in the project.json file.
 *
 * @class
 */
var ProjectUtils = {};

/**
 * Writes the omen lock file - used for the update command.
 *
 * @deprecated
 * @param {Object} cli The CLI object reference.
 * @param {Object} omenLock The properties to be written in the lock file.
 */
ProjectUtils.omenLockWrite = function (cli, omenLock) {
    cli.ok("Writing omen.lock file...");
    ProjectUtils.omenFiles("./omen.lock", omenLock);
};

/**
 * Writes the updated project file.
 *
 * @deprecated
 * @param {Object} cli The CLI object reference.
 * @param {Project} project The project file.
 */
ProjectUtils.omenProjectUpdate = function (cli, project) {
    cli.ok("Writing project.json file...");
    ProjectUtils.omenFiles("./project.json", project.all());
};

/**
 * Writes the omen project file - used for the create command.
 *
 * @deprecated
 * @param {Object} cli The CLI object reference.
 * @param {Object} omenJson The properties to be written in the project file.
 */
ProjectUtils.omenJsonWrite = function (cli, omenJson) {
    cli.ok("Writing project.json file...");
    ProjectUtils.omenFiles("./" + omenJson.name + "/project.json", omenJson);
};

/**
 * Writes the omen project file - used for the init command.
 *
 * @deprecated
 * @param {Object} cli The CLI object reference.
 * @param {Object} omenJson The properties to be written in the project file.
 */
ProjectUtils.omenJsonInit = function (cli, omenJson) {
    cli.ok("Writing project.json file...");
    ProjectUtils.omenFiles("./project.json", omenJson);
};

/**
 * Writes the omen.lock/project.json files.
 *
 * @param {String} filepath
 */
ProjectUtils.omenFiles = function (filepath, content) {
    fs.writeFileSync(path.resolve(filepath), JSON.stringify(content, null, 4));
};

/**
 * For a given project builds the dependencies list that is sent to the server.
 *
 * @deprecated
 * @param {Project} project The project for which the dependencies are being built.
 * @return Array
 */
ProjectUtils.buildDependencies = ProjectDependencyOmen.buildDependencies;

/**
 * Performs a check of the dependencies on the server.
 *
 * @deprecated
 * @param {Array} dependencies The dependencies to be checked.
 * @param {Array} [update] The installed dependencies.
 * @return Promise
 */
ProjectUtils.checkDependencies = ProjectDependencyOmen.checkDependencies;

/**
 * For the given dependencies, download them and store them locally.
 *
 * @deprecated
 * @param {Array} dependencies The dependencies to be downloaded.
 * @return Promise
 */
ProjectUtils.downloadDependencies = ProjectDependencyOmen.downloadDependencies;

/**
 * Creates the archive containing the project.
 *
 * @deprecated
 * @param {String} archiveName The name of the final archive.
 * @param {String} fullPath The fullPath to the folder to be archived.
 * @param {String[]} lines The lines from the .omenignore file.
 * @return Writer
 */
ProjectUtils.packageWriter = ProjectPublishOmen.packageWriter;

/**
 * Publishes the local package to the system defined repository.
 *
 * @deprecated
 * @param {Project} project The information about the current package.
 * @param {Object} promptResult The password and other questions asked by the application.
 * @return Promise
 */
ProjectUtils.publish = ProjectPublishOmen.publish;

/**
 * Packages the current project.
 *
 * @deprecated
 * @param {Project} project The information about the current package.
 * @return Promise
 */
ProjectUtils.pack = ProjectPublishOmen.pack;

/**
 * Performs the installation of the packages requested in the simple.json file.
 *
 * @param {Object} omenLock The lock file object.
 * @param {Object} cli The CLI object reference.
 * @param {Object} res The response from the server.
 */
ProjectUtils.install = function (omenLock, cli, res) {

    /* If there is an error, then notify the developer about it and end the execution. */
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

    var installedPackages = Object.keys(omenLock.packages);
    for (var packageName in res.packages) {
        var packageDl = res.packages[packageName];

        if (installedPackages.indexOf(packageDl.package) >= 0)
            if (packageDl.version == omenLock.packages[packageDl.package]) {
                delete res.dependencies[packageDl.package];
                delete res.packages[packageName];
            }

    }

    /* Check the existence of the vendors folder and create if it doesn't.*/
    if (!fs.existsSync("./vendors"))
        fs.mkdirSync("./vendors");

    if (Object.isValid(res.dependencies)) {
        cli.info("Downloading files");

        /* Download the dependencies. */
        ProjectUtils.downloadDependencies(res.dependencies).then(function () {
                /* Store the received dependencies in the lock object. */
                for (var iPacks in res.packages) {
                    var omenPackage = res.packages[iPacks];
                    omenLock.packages[omenPackage.package] = omenPackage.version;

                    cli.ok("Installed package: [" + omenPackage.package + "] version: [" + omenPackage.version + "].");
                }

                /* Store the lock object*/
                ProjectUtils.omenLockWrite(cli, omenLock);

                if (GLOBAL.OMEN_SAVE) {
                    var deps = GLOBAL.OMEN_PROJECT.get('dependencies');

                    for (var packageName in deps) {
                        if (deps[packageName] == GLOBAL.OMEN_PROJECT.MAX_VERSION)
                            deps[packageName] = omenLock.packages[packageName];
                    }

                    GLOBAL.OMEN_PROJECT.setDependency(deps);
                    ProjectUtils.omenProjectUpdate(cli, GLOBAL.OMEN_PROJECT);
                }
            },
            function (err) {
                /* In case an error is received, display it. */
                cli.error(err.message);
                cli.ok('====================================================');
            });
    }
    else
        ProjectUtils.omenLockWrite(cli, omenLock);

};

/**
 * Displays an error that occurs during the package installation.
 *
 * @param {Object} cli The CLI object reference.
 * @param {Object} err The error response.
 */
ProjectUtils.installError = function (cli, err) {
    /* In case an error is received, display it. */
    //console.log(JSON.stringify(err.message.body));
    cli.error("Got HTTP: " + err.message.status);
    cli.ok('====================================================');
};

/**
 * Unpublishes a project from the repository.
 *
 * @deprecated
 * @param {Project} project The project to be unpublished.
 * @param {Object} promptResult The password and other questions asked by the application.
 * @return Promise
 */
ProjectUtils.unpublishProject = ProjectUnpublishOmen.unpublishProject;

/**
 * Performs a check of the dependencies on the server.
 *
 * @param {Project} project The project to be unpublished.
 * @param {String} version The version to be unpublished.
 * @param {Object} promptResult The password and other questions asked by the application.
 * @return Promise
 */
ProjectUtils.unpublishVersion = ProjectUnpublishOmen.unpublishVersion;

module.exports = ProjectUtils;
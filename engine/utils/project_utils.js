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

var unirest = require('unirest'),
    OmenAPI = require('./omen_api'),
    fs = require('fs'),
    path = require('path'),
    fstream = require('fstream'),
    tar = require('tar'),
    zlib = require('zlib'),
    Download = require('download'),
    Q = require("q");

/**
 * Project manipulation utilities. Installs the dependencies defined in the project.json file.
 *
 * @class
 */
var ProjectUtils = {};

/**
 * Checks if the given variable is valid or not.
 *
 * @param {Object} value The variable to be checked.
 * @return Boolean
 */
var _isValid = function (value) {
    return value !== undefined && value !== null;
};

/**
 * Writes the omen lock file - used for the update command.
 *
 * @param {Object} cli The CLI object reference.
 * @param {Object} omenLock The properties to be written in the lock file.
 */
ProjectUtils.omenLockWrite = function (cli, omenLock) {
    cli.ok("Writing omen.lock file...");
    fs.writeFile(path.resolve("./omen.lock"), JSON.stringify(omenLock, null, 4));
};

/**
 * Writes the updated project file.
 *
 * @param {Object} cli The CLI object reference.
 * @param {Project} project The project file.
 */
ProjectUtils.omenProjectUpdate = function (cli, project) {
    cli.ok("Writing project.json file...");
    fs.writeFileSync(path.resolve("./project.json"), JSON.stringify(project.all(), null, 4));
};

/**
 * Writes the omen project file - used for the create command.
 *
 * @param {Object} cli The CLI object reference.
 * @param {Object} omenJson The properties to be written in the project file.
 */
ProjectUtils.omenJsonWrite = function (cli, omenJson) {
    cli.ok("Writing project.json file...");
    fs.writeFileSync(path.resolve("./" + omenJson.name + "/project.json"), JSON.stringify(omenJson, null, 4));
};

/**
 * Writes the omen project file - used for the init command.
 *
 * @param {Object} cli The CLI object reference.
 * @param {Object} omenJson The properties to be written in the project file.
 */
ProjectUtils.omenJsonInit = function (cli, omenJson) {
    cli.ok("Writing project.json file...");
    fs.writeFileSync(path.resolve("./project.json"), JSON.stringify(omenJson, null, 4));
};

/**
 * For a given project builds the dependencies list that is sent to the server.
 *
 * @param {Project} project The project for which the dependencies are being built.
 * @return Array
 */
ProjectUtils.buildDependencies = function (project) {
    var versionPattern = new RegExp("^(<|>|<=|>=)?([0-9]+).((\\*|[0-9]+)(\.([0-9]+|\\*))?)$", "i"),
        returnDependencies = [],
        dependencies = project.get('dependencies'),
        i = 0;

    if (!_isValid(dependencies))
        return returnDependencies;


    for (var iElem in dependencies) {
        var app = iElem,
            verArr = versionPattern.exec(dependencies[iElem]),
            version = {};

        version.operator = verArr[1];
        if (!_isValid(version.operator))
            version.operator = "=";

        version.major = verArr[2];
        version.minor = verArr[4];
        version.patch = verArr[6];

        if (!_isValid(version.minor))
            version.minor = "0";
        else if (version.minor == "*")
            version.like = true;

        if (!_isValid(version.patch))
            version.patch = "0";
        else if (version.patch == "*")
            version.like = true;

        returnDependencies.push({
            package: app,
            version: version
        });
    }

    return returnDependencies;
};

/**
 * Performs a check of the dependencies on the server.
 *
 * @param {Array} dependencies The dependencies to be checked.
 * @param {Array} [update] The installed dependencies.
 * @return Promise
 */
ProjectUtils.checkDependencies = function (dependencies, update) {
    var deferred = Q.defer(),
        data = {deps: dependencies},
        url = '/dependency/check';

    /**
     * In case the update command is run, we must attach the
     * installed dependencies.
     */
    if (_isValid(update)) {
        data.installed = update;
        url = '/dependency/update';
    }

    /* The check of the dependencies is being done on the server. */
    unirest.post(OmenAPI.buildURL(url))
        .type('json')
        .send(data)
        .end(function (response) {
            if (response.statusType == 4 || response.statusType == 5)
                deferred.reject(new Error({status: response.status, body: response.body}));
            else
                deferred.resolve(response.body);
        });

    return deferred.promise;
};

/**
 * For the given dependencies, download them and store them locally.
 *
 * @param {Array} dependencies The dependencies to be downloaded.
 * @return Promise
 */
ProjectUtils.downloadDependencies = function (dependencies) {
    var downloads = (new Download({mode: '755', extract: true})).dest('./vendors'),
        deferred = Q.defer();

    /* Build the download list. */
    for (var i in dependencies) {
        downloads.get(dependencies[i]);
    }

    /* Downloads the files. */
    downloads.run(function (err, files) {
        if (err !== null && err !== undefined) {
            deferred.reject(new Error(err));
            return;
        }

        deferred.resolve(files);
    });

    return deferred.promise;
};

/**
 * Creates the archive containing the project.
 *
 * @param {String} archiveName The name of the final archive.
 * @param {String} fullPath The fullPath to the folder to be archived.
 * @param {String[]} lines The lines from the .omenignore file.
 * @return Writer
 */
ProjectUtils.packageWriter = function (archiveName, fullPath, lines) {
    /**
     * Create the package that will be sent to the repository.
     * We will create a .tar.gz2 file with .spk extension.
     */
    var writer = fstream.Writer({'path': 'omenpackage.spk'});
    for (var iLine in lines) {
        var line = lines[iLine].trim();

        if (line.startsWith("#") || line.length === 0)
            delete lines[iLine];
        else
            lines[iLine] = line;
    }

    fstream.Reader({
        'path': '.',
        'type': 'Directory',
        filter: function () {
            var file = this.path.substring(fullPath.length);

            /* Filter some standard files to not be included in the package. */
            if (this.basename.match(/^\.git/) ||
                this.basename.match(/^vendors/) ||
                this.basename.match(new RegExp("^" + archiveName)) ||
                this.basename.match(/^omenpackage.spk/) ||
                this.basename.match(/^node_modules/))
                return false;

            /* Filter the files specified in .omenignore file. */
            for (var iLine in lines) {
                var line = lines[iLine].trim();

                if (!_isValid(line) || line.startsWith("#") || line.length === 0)
                    continue;

                if (this.basename.match(new RegExp(line)))
                    return false;

                if (file.match(new RegExp(line)))
                    return false;
            }

            return true;
        }
    })
        .pipe(tar.Pack())/* Convert the directory to a .tar file */
        .pipe(zlib.Gzip())/* Compress the .tar file */
        .pipe(writer);

    return writer;
};

/**
 * Publishes the local package to the system defined repository.
 *
 * @param {String} whatToDo An action regarding the package.
 * @param {Project} project The information about the current package.
 * @param {Object} promptResult The password and other questions asked by the application.
 * @return Promise
 */
ProjectUtils.publish = function (whatToDo, project, promptResult) {
    var deferred, lines, data, fullPath;

    deferred = Q.defer();
    lines = [];
    fullPath = path.resolve('.');

    /* Try to read the file with ignore elements. */
    try {
        data = fs.readFileSync('.omenignore', "utf-8");
        lines = data.split(/\n/);
    } catch (err) {

    }

    var writer = ProjectUtils.packageWriter('omenpackage.spk', fullPath, lines);

    /* When the archive has been written to the fs, send it to the repository. */
    writer.on("close", function () {
        unirest.post(OmenAPI.buildURL('/publish/project'))
            .headers({'Accept': 'application/json'})
            .attach('file', './omenpackage.spk') // Attachment
            //.field("omenFile", JSON.stringify(project.all()))
            .field("omenFile", project.all())
            .field("user", project.get('author').email)
            .field("pass", promptResult.Password)
            .end(function (response) {
                //console.log(response.body);
                fs.unlinkSync(path.resolve('./omenpackage.spk'));

                if (response.statusType == 4 || response.statusType == 5)
                    deferred.reject({status: response.status, body: response.body});
                else
                    deferred.resolve(response.body);
            });
    });

    return deferred.promise;
};

/**
 * Packages the current project.
 *
 * @param {Project} project The information about the current package.
 * @return Promise
 */
ProjectUtils.pack = function (project) {
    var deferred, lines, data, fullPath;

    deferred = Q.defer();
    lines = [];
    fullPath = path.resolve('.');

    /* Try to read the file with ignore elements. */
    try {
        data = fs.readFileSync('.omenignore', "utf-8");
        lines = data.split(/\n/);
    } catch (err) {

    }
    var archiveName = project.get('name').replace(/[\/\/-]/gi, '_') + ".tar.gz";
    var writer = ProjectUtils.packageWriter(archiveName, fullPath, lines);

    /* When the archive has been written to the fs, send it to the repository. */
    writer.on("close", function () {
        fs.renameSync(path.resolve('./omenpackage.spk'), path.resolve('./' + archiveName));
        deferred.resolve(archiveName);
    });

    return deferred.promise;
};

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
            if (line.available !== null && line.available !== undefined)
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

    if (res.dependencies !== null && res.dependencies !== undefined) {
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
 * @param {Project} project The project to be unpublished.
 * @param {Object} promptResult The password and other questions asked by the application.
 * @return Promise
 */
ProjectUtils.unpublishProject = function (project, promptResult) {
    var deferred = Q.defer(),
        data = {
            name: project.get('name'),
            user: project.get('author').email,
            pass: promptResult.Password
        };

    /* The check of the dependencies is being done on the server. */
    unirest.delete(OmenAPI.buildURL('/unpublish/project'))
        .type('json')
        .send(data)
        .end(function (response) {
            if (response.statusType == 4 || response.statusType == 5)
                deferred.reject(new Error({status: response.status, body: response.body}));
            else {
                deferred.resolve(response.body);
            }
        });

    return deferred.promise;
};

/**
 * Performs a check of the dependencies on the server.
 *
 * @param {Project} project The project to be unpublished.
 * @param {String} version The version to be unpublished.
 * @param {Object} promptResult The password and other questions asked by the application.
 * @return Promise
 */
ProjectUtils.unpublishVersion = function (project, version, promptResult) {
    var deferred = Q.defer(),
        data = {
            name: project.get('name'),
            version: version,
            user: project.get('author').email,
            pass: promptResult.Password
        };

    /* The check of the dependencies is being done on the server. */
    unirest.delete(OmenAPI.buildURL('/unpublish/version'))
        .type('json')
        .send(data)
        .end(function (response) {
            if (response.statusType == 4 || response.statusType == 5)
                deferred.reject(new Error({status: response.status, body: response.body}));
            else {
                deferred.resolve(response.body);
            }
        });

    return deferred.promise;
};

module.exports = ProjectUtils;
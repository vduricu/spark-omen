/**
 * Project publish tools
 *
 * @package engine/project
 * @author valentin.duricu
 * @date 21.07.2015
 * @module project
 */
/*jslint node: true */
"use strict";

var fstream = require('fstream'),
    tar = require('tar'),
    zlib = require('zlib'),
    unirest = require('unirest'),
    path = require('path'),
    fs = require('fs'),
    Q = require("q");

var OmenAPI = require('./../utils/omenApi');

var ProjectPublishOmen;

/**
 * Project publish tools
 *
 * @class
 * @return ProjectPublishOmen
 */
ProjectPublishOmen = function(){
    var self = this;

    /**
     * Creates the archive containing the project.
     *
     * @param {String} archiveName The name of the final archive.
     * @param {String} fullPath The fullPath to the folder to be archived.
     * @param {String[]} lines The lines from the .omenignore file.
     * @return Writer
     */
    self.packageWriter = function (archiveName, fullPath, lines) {
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
                    this.basename.match(/^appserver/) ||
                    this.basename.match(/^node_modules/))
                    return false;

                /* Filter the files specified in .omenignore file. */
                for (var iLine in lines) {
                    var line = lines[iLine].trim();

                    if (!Object.isValid(line) || line.startsWith("#") || line.length === 0)
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
     * @param {Project} project The information about the current package.
     * @param {Object} promptResult The password and other questions asked by the application.
     * @return Promise
     */
    self.publish = function (project, promptResult) {
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

        var writer = self.packageWriter('omenpackage.spk', fullPath, lines);

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
    self.pack = function (project) {
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
        var writer = self.packageWriter(archiveName, fullPath, lines);

        /* When the archive has been written to the fs, send it to the repository. */
        writer.on("close", function () {
            fs.renameSync(path.resolve('./omenpackage.spk'), path.resolve('./' + archiveName));
            deferred.resolve(archiveName);
        });

        return deferred.promise;
    };

    return self;
};


module.exports = new ProjectPublishOmen();
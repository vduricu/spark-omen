/**
 * Progress utilities
 *
 * @package engine/utils
 * @author valentin.duricu
 * @date 21.07.2015
 * @module utils
 */
/*jslint node: true */
"use strict";

var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars');

var Project = require('./../project/project'),
    fsOmen = require('./fs');

var ProgressUtils;

/**
 * Progress utilities
 *
 * @class
 * @return ProgressUtils
 */
ProgressUtils = function () {
    var self = this;

    /**
     * Returns the propath to be used by the current defined application.
     *
     * @param {Project} lock The lock file reference.
     * @param {String[]} listing The propath in array format
     * @return {String}
     */
    self.propath = function (lock, listing) {
        var propath = '',
            sourceFolder = ["src", "source"],
            vendors = fsOmen.folderLister('./vendors/');

        propath += fsOmen.resolve('.') + ";";

        for (var vendor in vendors.content) {
            var omenPackage = vendors.content[vendor];
            var folder = omenPackage.file;

            if (omenPackage.type !== "directory")
                continue;

            var project = new Project(fsOmen.resolve('./vendors/' + folder + '/project.json'));
            if (project.has('src'))
                folder += '/' + project.get('src');
            else
                for (var innerPackage in omenPackage.content) {
                    if (omenPackage.content[innerPackage].type == "directory" &&
                        sourceFolder.indexOf(omenPackage.content[innerPackage].file) >= 0)
                        folder += "/src";
                }

            listing.push(folder);
            folder = fsOmen.resolve('./vendors/' + folder);
            propath += folder + ";";
        }

        propath += ';';
        return propath.replace(/;;/gi, ';');
    };

    /**
     * Generates the appserver configuration elements.
     *
     * @param {Project} project The project for which the appserver is created.
     * @param {Object} result The prompt result.
     */
    self.ubrokerTemplate = function (project, result) {
        if (!fs.existsSync(path.resolve('./appserver'))) {
            fs.mkdirSync(path.resolve('./appserver'));
            fs.mkdirSync(path.resolve('./appserver/logs'));
        }

        var appserver = fs.readFileSync(path.resolve(__dirname + '/utilsTemplates/appserver.hbs'), "utf-8"),
            appserverHbs = Handlebars.compile(appserver, {noEscape: true});

        var output = appserverHbs({
            name: project.get('name'),
            propath: (self.propath(project) + ';@{PROPATH}').replace(/;;/gi, ';'),
            brokerLog: path.resolve('./appserver/logs/' + project.get('name') + '.broker.log'),
            serverLog: path.resolve('./appserver/logs/' + project.get('name') + '.server.log'),
            workdir: path.resolve('./appserver'),
            port: result.Port,
            opMode: result.opMode
        });
        console.log(output);

        fs.writeFileSync(path.resolve("./appserver/.appserver"), output, "utf-8");
        fs.writeFileSync(path.resolve("./appserver/appserver.pf"), '# appserver parameter file\n', "utf-8");
    };

    return self;
};

module.exports = new ProgressUtils();
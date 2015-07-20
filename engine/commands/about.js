/**
 * Displays information about the current package.
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
    CommandOmen = require('./../base/command');
var AboutOmen;

/**
 * Displays information about the current package.
 *
 * @class
 */
AboutOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
AboutOmen.prototype = new CommandOmen("about");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The name of the file to parse.
 */
AboutOmen.prototype.run = function (args) {
    var self = this,
        project = new Project(self.filename);

    self.cli.header("Project information");
    self.cli.ok('Name:\t\t' + project.get('name'));
    self.cli.ok('Version:\t\t' + project.get('version'));
    self.cli.ok('Description:\t' + project.getWithDefault('description'));
    self.cli.ok('Keywords:\t\t' + project.getWithDefault('keywords'));
    self.cli.ok('Homepage:\t\t' + project.getWithDefault('homepage'));
    self.cli.ok('License:\t\t' + project.getWithDefault('license'));

    if (project.has('author')) {
        var author = project.get('author');
        self.cli.separator();
        self.cli.ok('Author:\n\t- Name:\t\t' + author.name + "\n\t- Email:\t" + author.email);
    }

    if (project.has('contributors')) {
        var contributors = project.get('contributors');
        self.cli.separator();
        self.cli.ok('Contributors:');
        for (var contributorId in contributors) {
            var contributor = contributors[contributorId];
            self.cli.ok('\t- Name:\t\t' + contributor.name + "\n\t- Email:\t" + contributor.email);
        }
    }

    if (project.has('dependencies')) {
        var deps = project.get('dependencies');
        self.cli.separator();
        self.cli.ok('Dependencies:');
        for (var depsKey in deps) {
            self.cli.ok('\t- Package:\t' + depsKey + "\n\t- Version:\t" + deps[depsKey]);
        }
    }

    self.cli.end();
};


module.exports = AboutOmen;
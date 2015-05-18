/**
 * Displays information about the current package.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 16.04.2015
 * @module commands/about
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command');
var AboutOmen;

/**
 * About command constructor.
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
AboutOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 *
 * @param {String} filename The name of the file to parse.
 */
AboutOmen.prototype.run = function (filename) {

    var project = new Project(filename);

    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project information:');
    this.cli().ok('----------------------------------------------------');
    this.cli().ok('Name:\t\t' + project.get('name'));
    this.cli().ok('Version:\t\t' + project.get('version'));
    this.cli().ok('Description:\t' + project.getWithDefault('description'));
    this.cli().ok('Keywords:\t\t' + project.getWithDefault('keywords'));
    this.cli().ok('Homepage:\t\t' + project.getWithDefault('homepage'));
    this.cli().ok('License:\t\t' + project.getWithDefault('license'));

    if (project.has('author')) {
        var author = project.get('author');
        this.cli().ok('----------------------------------------------------');
        this.cli().ok('Author:\n\t- Name:\t\t' + author.name + "\n\t- Email:\t" + author.email);
    }

    if (project.has('contributors')) {
        var contributors = project.get('contributors');
        this.cli().ok('----------------------------------------------------');
        this.cli().ok('Contributors:');
        for (var contributorId in contributors) {
            var contributor = contributors[contributorId];
            this.cli().ok('\t- Name:\t\t' + contributor.name + "\n\t- Email:\t" + contributor.email);
        }
    }

    if (project.has('dependencies')) {
        var deps = project.get('dependencies');
        this.cli().ok('----------------------------------------------------');
        this.cli().ok('Dependencies:');
        for (var depsKey in deps) {
            this.cli().ok('\t- Package:\t' + depsKey + "\n\t- Version:\t" + deps[depsKey]);
        }
    }

    this.cli().ok('====================================================');
};


module.exports = AboutOmen;
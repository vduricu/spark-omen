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
    fs = require("fs"),
    prompt = require('prompt');

var PublishOmen;

/**
 * Install command constructor.
 */
PublishOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
PublishOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
PublishOmen.prototype.run = function (filename) {
    var properties = [
        //{
        //    name: 'EMail',
        //    validator: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        //    warning: 'The email must be a valid one.'
        //},
        {
            name: 'Password',
            hidden: true
        }
    ];

    var args = GLOBAL.OMEN_CLI_ARGS;
    var whatToDo = "new";

    for (var i in args) {
        if (args[i] == "publish") {
            whatToDo = args[i + 1];
            if (whatToDo == null || whatToDo == undefined)
                whatToDo = "new";
        }
    }

    prompt.start();

    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - Project installation:');
    this.cli().ok('----------------------------------------------------');
    this.cli().info("Reading project information");

    var project = new Project(filename),
        self = this;

    this.cli().info("Checking project file");
    project.check();

    prompt.get(properties, function (err, result) {
        if (err) {
            throw new Error(err);
        }

        ProjectUtils.publish(project, result, function (result) {
            if (result.status == "update")
                return self.cli().info("You must run 'publish update' command!");

            self.cli().ok("Packages published");
            self.cli().ok('====================================================');
        }, function (err, body) {
            self.cli().error(err);
            if (body.error != null && body.error != undefined)
                self.cli().error(body.error.message);
            else
                self.cli().error(body.message);
            self.cli().error('====================================================');
        });
    });

};


module.exports = PublishOmen;
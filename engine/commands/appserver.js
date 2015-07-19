/**
 * Commands to manipulate the appserver creation
 *
 * @package engine/commands
 * @author valentin.duricu
 * @date 19.07.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    ProjectUtils = require('./../utils/project_utils'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    fs = require('fs'),
    path = require('path'),
    prompt = require('prompt');

var AppserverOmen;

/**
 * Commands to manipulate the appserver creation
 *
 * @class
 */
AppserverOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
AppserverOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 *
 * @param {String} [filename] The name of the file to be imported
 */
AppserverOmen.prototype.run = function (filename) {
    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - AppServer creation:');
    this.cli().ok('----------------------------------------------------');

    var self = this;
    var args = GLOBAL.OMEN_CLI_ARGS;
    var appsrvCommand = "";
    var project = new Project(filename);

    var properties = [
        {
            name: 'Port',
            description: 'AppServer port',
            type: 'string',
            pattern: /^[0-9]+$/,
            message: 'AppServer port must be integer',
            required: true
        },
        {
            name: 'opMode',
            description: 'Operating Mode',
            type: 'string',
            pattern: /^stateless|state\-free|state\-reset|state\-aware$/i,
            message: 'Invalid operating mode',
            required: false,
            default: "Stateless"
        }
    ];

    for (var i = 0; i < args.length; i++) {
        if (args[i] == "appserver") {
            appsrvCommand = args[i + 1];
            if (appsrvCommand === null || appsrvCommand === undefined || appsrvCommand.length === 0)
                throw new Error("No tool specified!");
        }
    }

    prompt.get(properties, function (err, result) {
        if (err) {
            throw new Error(err);
        }

        switch (appsrvCommand) {
            /* Generates only the files for ubroker, to be manually edited. */
            case 'template':
                self.cli().ok("Generating the ubroker.properties section template");
                ProjectUtils.ubrokerTemplate(project, result);

                break;

            /* Generates the files for ubroker and tries to update it. */
            case 'create':
                self.cli().ok("Generating the ubroker.properties section template");
                ProjectUtils.ubrokerTemplate(project, result);

                var dlc = process.env.DLC;
                if (dlc !== null && dlc !== undefined) {
                    self.cli().ok("Updating the ubroker.properties");

                    var dlcBroker = path.resolve(dlc + "/properties/ubroker.properties");
                    var appserver = fs.readFileSync(path.resolve("./appserver/.appserver"), "utf-8");
                    var ubroker = fs.readFileSync(dlcBroker, "utf-8");

                    if (ubroker.search("UBroker\.AS\." + project.get('name')) < 0) {
                        ubroker = ubroker.trim() + "\n" + appserver + "\n";
                    }

                    fs.writeFileSync(dlcBroker, ubroker, 'utf-8');
                }

                break;
        }

    });

};

module.exports = AppserverOmen;
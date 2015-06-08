/**
 * Displays the full propath to be used in the application.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 07.06.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var Project = require('./../project/project'),
    Spark = require('./../base/spark'),
    CommandOmen = require('./../base/command'),
    OmenAPI = require('./../utils/omen_api');
var PropathOmen;

/**
 * Displays the full propath to be used in the application.
 *
 * @class
 */
PropathOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
PropathOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
PropathOmen.prototype.run = function () {
    var lock = new Project('omen.lock'),
        propath = OmenAPI.propath(lock),
        args = GLOBAL.OMEN_CLI_ARGS,
        result = "full";

    for (var i = 0; i < args.length; i++) {
        if (args[i] == "propath") {
            result = args[i + 1];
            if (result === null || result === undefined)
                result = "full";
        }
    }

    this.cli().ok('====================================================');
    this.cli().ok('    Omen (' + Spark.version() + ') - ProPath value:');
    this.cli().ok('----------------------------------------------------');
    switch (result) {
        case 'shell':
            this.cli().ok((propath + '$PROPATH').replace(/;/gi, ':'));
            break;
        case 'appserver':
            this.cli().ok((propath + ';@{PROPATH}').replace(/;;/gi, ';'));
            break;
        default:
        case 'full':
            this.cli().ok(('propath = "' + propath + ';" + propath.').replace(/;;/gi, ';'));
            break;
    }
    this.cli().ok('====================================================');
};


module.exports = PropathOmen;
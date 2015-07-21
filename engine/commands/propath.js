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
    ProgressUtils = require('./../utils/progressUtils');
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
PropathOmen.prototype = new CommandOmen("propath");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
PropathOmen.prototype.run = function (args) {
    var self = this,
        lock = new Project('omen.lock'),
        propath = ProgressUtils.propath(lock),
        result = "full";

    for (var i = 0; i < args.length; i++) {
        if (args[i] == self.commandName) {
            result = args[i + 1];
            if (!Object.isValid(result))
                result = "full";
        }
    }

    self.cli.header('ProPath value');
    switch (result) {
        case 'shell':
            self.cli.ok((propath + '$PROPATH').replace(/;/gi, ':'));
            break;
        case 'appserver':
            self.cli.ok((propath + ';@{PROPATH}').replace(/;;/gi, ';'));
            break;
        default:
        case 'full':
            self.cli.ok(('propath = "' + propath + ';" + propath.').replace(/;;/gi, ';'));
            break;
    }
    self.cli.end();
};


module.exports = PropathOmen;
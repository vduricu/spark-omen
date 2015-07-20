/**
 * Generates sample files based on template files stored in the templates folder.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 07.06.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var CommandOmen = require('./../base/command'),
    templates = require('./../../templates/templates');
var TemplateOmen;

/**
 * Generates sample files based on template files stored in the templates folder.
 *
 * @class
 */
TemplateOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
TemplateOmen.prototype = new CommandOmen("template");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
TemplateOmen.prototype.run = function (args) {
    var self = this,
        filename = "sample";

    for (var i = 0; i < args.length; i++) {
        if (args[i] == self.commandName) {
            filename = args[i + 1];
            if (!GeneralOmen.isValid(filename) || filename.length === 0)
                filename = "sample";
        }
    }

    templates(filename, self.cli);
};

module.exports = TemplateOmen;
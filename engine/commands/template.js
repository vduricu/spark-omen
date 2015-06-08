/**
 * Generates sample files based on template files stored in the templates folder.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 07.06.2015
 * @module commands/template
 */
/*jslint node: true */
"use strict";

var CommandOmen = require('./../base/command'),
    templates = require('./../../templates/templates');
var TemplateOmen;

/**
 * Templates command constructor.
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
TemplateOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
TemplateOmen.prototype.run = function () {
    var args = GLOBAL.OMEN_CLI_ARGS,
        filename = "sample";

    for (var i = 0; i < args.length; i++) {
        if (args[i] == "template") {
            filename = args[i + 1];
            if (filename === null || filename === undefined)
                filename = "sample";
        }
    }

    templates(filename, this.cli());
};

module.exports = TemplateOmen;
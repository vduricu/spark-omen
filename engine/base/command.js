/**
 * The base command on which all other commands are created.
 *
 * @package engine\base
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 17.04.2015
 * @module base
 */
/*jslint node: true */
"use strict";

var CommandOmen;

/**
 * The base command on which all other commands are created.
 *
 * @class
 * @return CommandOmen
 */
CommandOmen = function () {
    /* -- Private properties definition -- */
    var _cli = null,
        _filename = "project.json";

    /**
     * Private properties initialisation.
     *
     * @param {Object} cli The console module reference.
     * @param {string} [filename] The name of the file to parse.
     */
    this.init = function (cli, filename) {
        _cli = cli;

        if (filename !== null && filename !== undefined && filename.length > 0)
            _filename = filename;
    };

    /**
     * Returns the filename to pe parsed.
     *
     * @return String
     */
    this.filename = function () {
        return _filename;
    };

    /**
     * Returns a reference to the CLI module.
     *
     * @return Object
     */
    this.cli = function () {
        return _cli;
    };

    /**
     * Code that runs when a command is executed.
     *
     * @param {String|Object|Object[]} [args] The parameters sent to the command.
     */
    this.run = function (args) {
        throw new Error("Command not implemented");
    };

    return this;
};

module.exports = CommandOmen;
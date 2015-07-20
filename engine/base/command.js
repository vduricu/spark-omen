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
 * @param {String} commandName The name of the command to be executed.
 * @return CommandOmen
 */
CommandOmen = function (commandName) {
    /* -- Private properties definition -- */
    var self = this;

    /**
     * Returns a reference to the CLI module.
     *
     * @property Object
     */
    self.cli = null;

    /**
     * Returns the filename to pe parsed.
     *
     * @property String
     */
    self.filename = null;

    /**
     * Returns the name of the command to be executed.
     *
     * @property String
     */
    self.commandName = commandName;

    if(!Object.isValid(commandName))
        self.commandName = "";

    /**
     * Private properties initialisation.
     *
     * @param {CliListenerOmen} cli The console module reference.
     * @param {String} [filename] The name of the file to parse.
     */
    self.init = function (cli, filename) {
        self.cli = cli;

        if (filename !== null && filename !== undefined && filename.length > 0)
            self.filename = filename;
    };

    /**
     * Code that runs when a command is executed.
     *
     * @param {String|Object|Object[]} [args] The parameters sent to the command.
     */
    self.run = function (args) {
        throw new Error("Command not implemented");
    };

    return this;
};

module.exports = CommandOmen;
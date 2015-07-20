/**
 * Hookups to run commands before/after executing a given command.
 *
 * @package engine/base
 * @author valentin.duricu
 * @date 18.07.2015
 * @module base
 */
/*jslint node: true */
"use strict";

var exec = require('child_process').exec;

var HookupOmen;

/**
 * Hookups to run commands before/after executing a given command.
 *
 * @class
 * @return HookupOmen
 */
HookupOmen = function () {
    var preCommands = {},
        postCommands = {};
    var self = this,
        /**
         * Helper function used to print messages to the standard output.
         *
         * @param {String} data The data sent by the executed command.
         */
        stdoutMessage = function (data) {
            console.log("INFO:" + data.trim());
        },
        /**
         * Helper function used to print messages to the standard error output.
         *
         * @param {String} data The data sent by the executed command.
         */
        stderrMessage = function (data) {
            console.log("ERROR:" + data.trim());
        };

    /**
     * Executes the given list of commands.
     *
     * @param {String[]} commandList The data sent by the executed command.
     */
    var executeCommand = function (commandList) {
        if (commandList === null || commandList === undefined)
            return;

        for (var iCommand in commandList) {
            var child = exec(commandList[iCommand]);
            child.stdout.on('data', stdoutMessage);
            child.stderr.on('data', stderrMessage);
        }
    };

    /**
     * Parses the given scripts list and adds the commands to be execute to
     * the desired command in the desired zone (pre/post execution).
     *
     * @param {Object} scripts A dictionary with commands and zones.
     */
    self.parse = function (scripts) {
        for (var cScript in scripts) {
            var result = /^(post|pre)-([a-z]+)-cmd$/gi.exec(cScript);
            var zone = result[1].charAt(0).toUpperCase() + result[1].substring(1),
                command = result[2];

            for (var iScript in scripts[cScript]) {
                self["push" + zone](command, scripts[cScript][iScript]);
            }
        }
    };

    /**
     * Executes the post command execution commands for the given command.
     *
     * @param {String} command The command for which the commands are executed.
     */
    self.post = function (command) {
        executeCommand(postCommands[command]);
    };

    /**
     * Executes the pre command execution commands for the given command.
     *
     * @param {String} command The command for which the commands are executed.
     */
    self.pre = function (command) {
        executeCommand(preCommands[command]);
    };

    /**
     * Adds commands to be executed after the command execution.
     *
     * @param {String} command The name of the command.
     * @param {String} execute The command line to be executed.
     */
    self.pushPost = function (command, execute) {
        if (postCommands[command] === null || postCommands[command] === undefined)
            postCommands[command] = [];

        postCommands[command].push(execute);
    };

    /**
     * Adds commands to be executed before the command execution.
     *
     * @param {String} command The name of the command.
     * @param {String} execute The command line to be executed.
     */
    self.pushPre = function (command, execute) {
        if (preCommands[command] === null || preCommands[command] === undefined)
            preCommands[command] = [];

        preCommands[command].push(execute);
    };

    return this;
};

module.exports = HookupOmen;
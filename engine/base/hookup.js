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

var exec = require('promised-exec'),
    q = require("q");

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
     * @return null|Object
     */
    var executeCommand = function (commandList) {
        if (commandList === null || commandList === undefined)
            return null;

        var promises = [];
        for (var iCommand in commandList) {
            promises.push(exec(commandList[iCommand]));
        }

        return q.all(promises);
    };

    /**
     * Sets the function used to parse the stdout.
     *
     * @param {function} stdout The function.
     */
    self.setStdout = function (stdout) {
        stdoutMessage = stdout;
    };

    /**
     * Sets the function used to parse the stderr.
     *
     * @param {function} stderr The function.
     */
    self.setStderr = function (stderr) {
        stderrMessage = stderr;
    };

    /**
     * Parses the given scripts list and adds the commands to be execute to
     * the desired command in the desired zone (pre/post execution).
     *
     * @param {Object} scripts A dictionary with commands and zones.
     */
    self.parse = function (scripts) {
        preCommands = {};
        postCommands = {};

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
     * Returns the number of commands for the given zone and command.
     *
     * @param {String} zone The needed zone.
     * @param {String} command The name of the command.
     * @return {Number}
     */
    self.size = function (zone, command) {
        return self["size" + zone.charAt(0).toUpperCase() + zone.substring(1)](command);
    };

    /**
     * Returns the number of post commands for the given command.
     *
     * @param {String} command The name of the command.
     * @return {Number}
     */
    self.sizePost = function (command) {
        if (!Object.isValid(postCommands[command]))
            return 0;
        return postCommands[command].length;
    };

    /**
     * Returns the number of pre commands for the given command.
     *
     * @param {String} command The name of the command.
     * @return {Number}
     */
    self.sizePre = function (command) {
        if (!Object.isValid(preCommands[command]))
            return 0;
        return preCommands[command].length;
    };

    /**
     * Executes the post command execution commands for the given command.
     *
     * @param {String} command The command for which the commands are executed.
     * @param {function} [then] Callback to be executed after success.
     * @param {function} [err] Callback to be executed after error.
     * @return null|Object
     */
    self.post = function (command, then, err) {
        var result = executeCommand(postCommands[command]);

        if(!Object.isValid(result))
            return null;

        return result.then(function (promise) {
            promise.forEach(function (result) {
                var value = "";
                if (result.state === "fulfilled") {
                    value = result.value.trim();
                } else {
                    value = result.reason.trim();
                }

                stdoutMessage(value);

                if (Object.isValid(then))
                    then();
            });
        }, function (errMsg) {
            stderrMessage(errMsg.string);
            if (Object.isValid(err))
                err();
        });
    };

    /**
     * Executes the pre command execution commands for the given command.
     *
     * @param {String} command The command for which the commands are executed.
     * @param {function} [then] Callback to be executed after success.
     * @param {function} [err] Callback to be executed after error.
     * @return null|Object
     */
    self.pre = function (command, then, err) {
        var result = executeCommand(preCommands[command]);

        if(!Object.isValid(result))
            return null;

        return result.then(function (promise) {
            promise.forEach(function (result) {
                var value = "";
                if (result.state === "fulfilled") {
                    value = result.value.trim();
                } else {
                    value = result.reason.trim();
                }

                stdoutMessage(value);

                if (Object.isValid(then)) {
                    then();
                }
            });
        }, function (errMsg) {
            stderrMessage(errMsg.string);
            if (Object.isValid(err)) {
                err();
            }
        });
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
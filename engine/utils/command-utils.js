/**
 * Command execution utilities.
 *
 * @package engine\utils
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 17.04.2015
 */
var _cli = null,
    _filename = "project.json";

/**
 * Executes a command sent in the CLI.
 *
 * @param command The command to be executed.
 * @return CommandOmen
 */
var CommandExecutor = function (command) {
    if (command == null || command == undefined)
        return _cli.getUsage();

    var classCmd = require('./../commands/' + command + '.js');

    if (classCmd == null || classCmd == undefined)
        return _cli.getUsage();

    cmd = new classCmd();
    cmd.init(_cli, _filename);
    return cmd;
};

/**
 * Initializes some variables used by the CommandExecutor function.
 *
 * @param cli The reference to cli library.
 * @param filename
 */
var SetInit = function (cli, filename) {
    _cli = cli;
    _filename = filename;
};

module.exports = {
    SetInit: SetInit,
    CommandExecutor: CommandExecutor
};
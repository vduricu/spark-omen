/*jslint node: true */
"use strict";

require('./../engine/utils/general');

var cli = require('cli').enable('status'),
    commandUtils = require('./../engine/utils/commandUtils'),
    CliListenerOmen = require('./../engine/ui/cliListener'),
    OmenAPI = require("./../engine/utils/omenApi");

global.OMEN_CONFIG = require('./../config/app.json');

cli.parse({
    //file: ['f', 'Selects the file to work with.'],
    save: ['s', 'Save the package.'],
    eclipse: ['e', 'Creates the eclipse project files. (create and init)'],
    version: ['v', "Displays the application version information."],
    fast: [null, "Initialises a project.json fast without asking questions. (create and init)"]
});

cli.main(function (args, options) {
    try {
        var command = args[0],
            filename = "project.json",
            cliListener = new CliListenerOmen(this);
        global.OMEN_CLI_ARGS = args;

        global.OMEN_ENV = global.OMEN_CONFIG[global.OMEN_CONFIG.env];

        var userenv = OmenAPI.readEnv();
        if (Object.isValid(userenv) && userenv.length != 0)
            global.OMEN_ENV = global.OMEN_CONFIG[userenv];

        if (process.env.OMEN_ENV)
            global.OMEN_ENV = global.OMEN_CONFIG[process.env.OMEN_ENV];

        // Uncomment the following 3 lines to enable the possibility to select a file
        // from which to install dependencies.
        //if (options.file) {
        //    filename = args[0];
        //    command = args[1];
        //}

        global.OMEN_SAVE = options.save ? true : false;
        global.OMEN_ECLIPSE = options.eclipse ? true : false;
        global.OMEN_FAST_CREATE = options.fast ? true : false;

        commandUtils.SetInit(cliListener, filename);

        if (options.version)
            return commandUtils.CommandExecutor('version').run(args);

        return commandUtils.CommandExecutor(command).run(args);
    } catch (err) {
        this.error(err.message);
        //throw err;
    }
});
"use strict";

var cli = require('cli').enable('status'),
    commandUtils = require('./../engine/utils/command_utils');

GLOBAL.OMEN_CONFIG = require('./../config/app.json');

cli.parse({
    file: ['f', 'Selects the file to work with.'],
    version: ['v', "Displays the application version information."]
});

cli.main(function (args, options) {
    try {
        var command = args[0],
            filename = "project.json";
        GLOBAL.OMEN_CLI_ARGS = args;

        GLOBAL.OMEN_ENV = GLOBAL.OMEN_CONFIG[GLOBAL.OMEN_CONFIG.env];
        if (process.env.OMEN_ENV)
            GLOBAL.OMEN_ENV = GLOBAL.OMEN_CONFIG[process.env.OMEN_ENV];

        if (options.file) {
            filename = args[0];
            command = args[1];
        }
        commandUtils.SetInit(this, filename);

        if (options.version)
            return commandUtils.CommandExecutor('version').run();

        return commandUtils.CommandExecutor(command).run(filename);
    } catch (err) {
        this.error(err.message);
    }
});
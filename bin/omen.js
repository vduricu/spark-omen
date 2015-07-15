/*jslint node: true */
"use strict";

require('./../engine/utils/string_utils');

var cli = require('cli').enable('status'),
    commandUtils = require('./../engine/utils/command_utils');

GLOBAL.OMEN_CONFIG = require('./../config/app.json');

cli.parse({
    //file: ['f', 'Selects the file to work with.'],
    save: ['s', 'Save the package.'],
    eclipse: ['e', 'Creates the eclipse project files. (Used only with omen create and init)'],
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

        // Uncomment the following 3 lines to enable the possibility to select a file
        // from which to install dependencies.
        //if (options.file) {
        //    filename = args[0];
        //    command = args[1];
        //}

        GLOBAL.OMEN_SAVE = options.save ? true : false;
        GLOBAL.OMEN_ECLIPSE = options.eclipse ? true : false;
        
        commandUtils.SetInit(this, filename);

        if (options.version)
            return commandUtils.CommandExecutor('version').run();

        return commandUtils.CommandExecutor(command).run(filename);
    } catch (err) {
        this.error(err.message);
        //throw err;
    }
});
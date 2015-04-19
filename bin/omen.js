var cli = require('cli').enable('status'),
    commandUtils = require('./../engine/utils/command-utils');

cli.parse({
    file: ['f', 'Selects the file to work with.'],
    version: ['v', "Displays the application version information."]
});

cli.main(function (args, options) {
    try {
        var command = args[0],
            filename = "project.json";

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
var cli = require('cli').enable('status');

cli.parse({
    about: ['a', 'Displays project information.'],
    install: ['i', 'Installs the application defined in the project file.'],
    update: ['u', 'Updates the application defined in the project file.']
});

var CommandExecutor = function (command) {
    var cmd = require('../engine/commands/' + command + '.js');
    return new cmd(cli);
};

cli.main(function (args, options) {
    try {
        if (options.install)
            return CommandExecutor('install').run(args);

        if (options.about)
            return CommandExecutor('about').run(args);

        return this.getUsage();

    } catch (err) {
        this.error(err);
    }
});
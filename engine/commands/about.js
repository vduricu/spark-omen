/**
 * Created by valentin on 16.04.2015.
 */

var Project = require('./../models/project.js');
var Spark = require('./../base/spark.js');
var AboutOmen;

AboutOmen = function (cli) {
    var _cli = cli;

    this.run = function (args) {

        var project,
            filename = "project.json";

        if (args.length == 1)
            filename = args[0];

        project = new Project(filename);

        _cli.ok('====================================================');
        _cli.ok('    Omen (' + Spark.version() + ') - Project information:');
        _cli.ok('----------------------------------------------------');
        _cli.ok('Name:\t\t' + project.get('name'));
        _cli.ok('Version:\t\t' + project.get('version'));
        _cli.ok('Description:\t' + project.getWithDefault('description'));
        _cli.ok('Keywords:\t\t' + project.getWithDefault('keywords'));
        _cli.ok('Homepage:\t\t' + project.getWithDefault('homepage'));
        _cli.ok('License:\t\t' + project.getWithDefault('license'));

        if (project.has('author')) {
            var author = project.get('author');
            _cli.ok('----------------------------------------------------');
            _cli.ok('Author:\n\t- Name:\t\t' + author.name + "\n\t- Email:\t" + author.email);
        }

        if (project.has('contributors')) {
            var contributors = project.get('contributors');
            _cli.ok('----------------------------------------------------');
            _cli.ok('Contributors:');
            for (var i in contributors) {
                var contributor = contributors[i];
                _cli.ok('\t- Name:\t\t' + contributor.name + "\n\t- Email:\t" + contributor.email);
            }
        }

        if (project.has('dependencies')) {
            var deps = project.get('dependencies');
            _cli.ok('----------------------------------------------------');
            _cli.ok('Dependencies:');
            for (var i in deps) {
                _cli.ok('\t- Package:\t' + i + "\n\t- Version:\t" + deps[i]);
            }
        }

        _cli.ok('====================================================');
    };

    return this;
};

module.exports = AboutOmen;
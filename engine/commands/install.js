/**
 * Created by valentin on 16.04.2015.
 */

var Project = require('./../models/project.js');
var Spark = require('./../base/spark.js');
var InstallOmen;

InstallOmen = function (cli) {
    var _cli = cli;

    this.run = function () {
        _cli.ok("Omen - OpenEdge Package Manger (v" + Spark.version() + ")" );
        _cli.info("Reading project information");

        var project = new Project("project.json");
        //console.log(project.get('name'));

        _cli.ok("Packages installed");
    };

    return this;
};

module.exports = InstallOmen;
/**
 * Installs the dependencies defined in the project.json file.
 *
 * @package engine\commands
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 16.04.2015
 */

var Project = require('./../models/project.js');
var Spark = require('./../base/spark.js');
var CommandOmen = require('./../base/command.js');
var InstallOmen;

/**
 * Install command constructor.
 */
InstallOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
InstallOmen.prototype = new CommandOmen();

/**
 * Code that runs when a command is executed.
 */
InstallOmen.prototype.run = function () {
    this.cli().ok("Omen - OpenEdge Package Manger (v" + Spark.version() + ")");
    this.cli().info("Reading project information");

    var project = new Project("project.json");
    console.log(project.get('name'));

    this.cli().ok("Packages installed");
};


module.exports = InstallOmen;
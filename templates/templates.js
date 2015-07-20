/**
 * Templates to be used by the template command.
 *
 * @package templates
 * @author valentin.duricu
 * @date 07.06.2015
 * @module templates
 */
/*jslint node: true */
"use strict";

var Spark = require('./../engine/base/spark'),
    OmenAPI = require('./../engine/utils/omenApi'),
    Handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path');

/**
 * Holds a list of templates (filename and the extension of the endfile).
 *
 * @var Object
 */
var templates = {
    sample: {
        filename: "sample.hbs",
        extension: ".p"
    },
    startup: {
        filename: "startup.hbs",
        extension: ".p"
    }
};

/**
 * Holds a list of variable that can be used in template files.
 *
 * @var Object
 */
var varsToCompile = {
    propath: OmenAPI.propath(),
    name: "",
    filename: "",
    version: Spark.version()
};

/**
 * Lists the available templates on the screen.
 *
 * @param {Object} cli A reference to the CLI object
 */
var listTemplates = function(cli){
    for(var i in templates){
        cli.ok('Template: ' + i + '\t\tExtension: ' + templates[i].extension);
    }
};

/**
 * Function to create the file based on the template.
 *
 * @param {String} filename The name of the template
 * @param {Object} cli A reference to the CLI object
 */
var templateRun = function(filename, cli){
    if (filename == "list")
        return listTemplates(cli);

    var template = templates[filename];
    if(template === null || template === undefined)
        return cli.error("The required template [" + filename + "} doesn't exists!");

    var fullFilename = path.resolve(__dirname + '/' + template.filename);

    fs.exists(fullFilename, function (exists) {
        if (!exists)
            return cli.error("The required template [" + filename + "} is missing!");

        var templateFile = fs.readFileSync(fullFilename, "utf-8");
        var templateHbs = Handlebars.compile(templateFile, {noEscape: true});
        varsToCompile.name = filename;
        varsToCompile.filename = filename + template.extension;

        var output = templateHbs(varsToCompile);

        fs.writeFileSync(path.resolve(varsToCompile.filename), output, "utf-8");

        varsToCompile.name = "";
        varsToCompile.filename = "";

        cli.ok('====================================================');
        cli.ok('    Omen (' + Spark.version() + ') - Generate sample files from templates:');
        cli.ok('----------------------------------------------------');
        cli.ok(' File [' + filename + '] has been created.');
        cli.ok('====================================================');
    });
};

module.exports = templateRun;
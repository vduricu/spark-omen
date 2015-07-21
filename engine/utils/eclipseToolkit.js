/**
 * Eclipse manipulation utilities.
 *
 * @package engine/utils
 * @author valentin.duricu
 * @date 15.07.2015
 * @module utils
 */
/*jslint node: true */
"use strict";

var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars'),
    ProgressUtils = require('./progressUtils');

var basePath = "./";

/**
 * Creates the project files to be used in eclipse.
 *
 * @param {Project} project The project information.
 */
var fileCreator = function (project) {
    var dotProject = fs.readFileSync(path.resolve(__dirname + '/utilsTemplates/project.hbs'), "utf-8"),
        dotProjectHbs = Handlebars.compile(dotProject, {noEscape: true});

    var name = project.name;
    if (name === null || name === undefined)
        name = project.get('name');

    var output = dotProjectHbs({
        name: name
    });
    fs.writeFileSync(path.resolve(basePath + ".project"), output, "utf-8");

    var dotPropath = fs.readFileSync(path.resolve(__dirname + '/utilsTemplates/propath.hbs'), "utf-8"),
        dotPropathHbs = Handlebars.compile(dotPropath, {noEscape: true});

    var extraEntries = [];
    ProgressUtils.propath(project, extraEntries);
    output = dotPropathHbs({
        extraEntries: extraEntries
    });
    fs.writeFileSync(path.resolve(basePath + ".propath"), output, "utf-8");

    var dotFacet = fs.readFileSync(path.resolve(__dirname + '/utilsTemplates/facet.hbs'), "utf-8"),
        dotFacetHbs = Handlebars.compile(dotFacet, {noEscape: true});

    if (!fs.existsSync(path.resolve(basePath + '.settings')))
        fs.mkdirSync(path.resolve(basePath + '.settings'));

    output = dotFacetHbs();
    fs.writeFileSync(path.resolve(basePath + ".settings/org.eclipse.wst.common.project.facet.core.xml"), output, "utf-8");

    if (!fs.existsSync(path.resolve(basePath + 'bin')))
        fs.mkdirSync(path.resolve(basePath + 'bin'));
    if (!fs.existsSync(path.resolve(basePath + 'src')))
        fs.mkdirSync(path.resolve(basePath + 'src'));
};

/**
 * Eclipse manipulation utilities.
 *
 * @class
 */
var EclipseToolkit = {};

/**
 * Initializes a new project into an existing folder.
 *
 * @param {Project} project The project to initialize.
 */
EclipseToolkit.initProject = function (project) {
    if (fs.existsSync(path.resolve('.project')))
        throw new Error("Project already exists! Please use update command");

    fileCreator(project);
};

/**
 * Updates an existing eclipse project.
 *
 * @param {Project} project The project to be updated.
 */
EclipseToolkit.updateProject = function (project) {
    fileCreator(project);
};

/**
 * Sets the base path of the eclipse project.
 *
 * @param {String} newBasePath The path to be used.
 */
EclipseToolkit.setBasePath = function (newBasePath) {
    basePath = newBasePath;
};

module.exports = EclipseToolkit;
/**
 * Loads a project description file and returns several information from it.
 *
 * @package engine\models
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 16.04.2015
 * @module project
 */
/*jslint node: true */
"use strict";

var fs = require('fs'),
    extend = require('util')._extend,
    Hookup = require('./../base/hookup');

var Project;

/**
 * Loads a project description file and returns several information from it.
 *
 * @class
 * @param {String} filename The name of the file to be parsed.
 * @return Project
 */
Project = function (filename) {
    /**
     * The name of the file to parse.
     *
     * @var String
     */
    var _filename = filename,
        /**
         * The list of properties.
         *
         * @var Object
         */
        _information = {},
        /**
         * Holds a reference to the current object.
         *
         * @var Project
         */
        self = this,
        /**
         * Holds a list of functions to be used when mandatory elements checks are performed.
         *
         * @var ProjectMandatory
         */
        _mandatory = require('./mandatory'),
        /**
         * Holds a list of functions to be used when checks are performed.
         *
         * @var ProjectExtras
         */
        _extras = require('./extras'),
        /**
         * Holds the hookups for the scripts to be executed.
         *
         * @var HookupOmen
         */
        _hookups = new Hookup();


    /**
     * Holds the maximum version number.
     *
     * @property
     * @var String
     */
    this.MAX_VERSION = "<=999.999.999";

    /**
     * Checks the project to be ok.
     *
     * @throws Error|EvalError
     */
    this.check = function () {
        /* Validates the mandatory elements of the project definition. */
        for (var iMandatory in _mandatory) {
            _mandatory[iMandatory](_information[iMandatory]);
        }

        /* Validates the optional elements for project definition. */
        for (var iExtras in _extras) {
            if (self.has(iExtras))
                _extras[iExtras](_information[iExtras]);
        }
    };

    /**
     * Returns the name of the loaded file.
     *
     * @return String
     */
    this.getFilename = function () {
        return _filename;
    };

    /**
     * Returns a property of the project.
     *
     * @param {String} key The property name.
     * @return Object|String|Object[]|String[]
     */
    this.get = function (key) {
        var val = _information[key];

        if (typeof val === "object" && val !== null)
            return extend({}, _information[key]);
        return _information[key];
    };

    /**
     * Returns a property of the project.
     *
     * @param {String} key The property name.
     * @param {String|Object} [defValue] The default value, if the element isn't defined.
     * If none is specified "-" is used.
     * @return Object|String
     */
    this.getWithDefault = function (key, defValue) {
        if (defValue === null || defValue === undefined)
            defValue = "-";

        return self.has(key) ? self.get(key) : defValue;
    };

    /**
     * Tests if a property is defined.
     *
     * @param {String} key The property name.
     * @return boolean
     */
    this.has = function (key) {
        return _information[key] !== null && _information[key] !== undefined;
    };

    /**
     * Returns all the properties as a dictionary.
     *
     * @return Object
     */
    this.all = function () {
        return _information;
    };

    /**
     * Adds the given dependency with the given version to the dependencies list.
     *
     * @param {String} omenPacakge The dependency project name.
     * @param {String} omenVersion The dependency project version.
     */
    this.addDependency = function (omenPackage, omenVersion) {
        if (!self.has('dependencies'))
            _information.dependencies = {};

        _information.dependencies[omenPackage] = omenVersion;
    };

    /**
     * Checks the existence of a given dependency of the current project.
     *
     * @param {String} omenPackage The project to check after.
     * @return boolean
     */
    this.hasDependency = function (omenPackage) {
        if (!self.has('dependencies'))
            return false;

        var dep = _information.dependencies[omenPackage];

        return dep !== null && dep !== undefined && dep.length !== 0;
    };

    /**
     * Sets the dependencies for the current project.
     *
     * @param {Object} omenPackages Dictionary with packages and versions.
     */
    this.setDependency = function (omenPackages) {
        _information.dependencies = omenPackages;
    };

    /**
     * Executes the pre command commands.
     *
     * @param {String} command The command for which we execute the pre commands.
     */
    this.executePre = function(command){
        _hookups.pre(command);
    };

    /**
     * Executes the post command commands.
     *
     * @param {String} command The command for which we execute the post commands.
     */
    this.executePost = function(command){
        _hookups.post(command);
    };

    /**
     * The main block of the application.
     */
    var mainBlock = function () {
        try {
            _information = JSON.parse(fs.readFileSync(_filename, 'utf8'));
        } catch (err) {
            throw new Error("File '" + _filename + "' not found");
        }

        if (!self.has('name') || !self.has('version'))
            throw new Error("The project must have a name and a version!");

        if (self.has('scripts'))
            _hookups.parse(self.get('scripts'));
    };

    mainBlock();

    return this;
};

module.exports = Project;
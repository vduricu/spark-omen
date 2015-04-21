/**
 * Loads a project description file and returns several information from it.
 *
 * @package engine\models
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 16.04.2015
 */
"use strict";
var fs = require('fs');

var Project;

/**
 * Project information.
 *
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
        _infos = {},
        /**
         * Holds a reference to the current object.
         *
         * @var Project
         */
        self = this,
        /**
         * Holds a list of functions to be used when mandatory elements checks are performed.
         *
         * @var Object
         */
        _mandatory = require('./project_mandatory'),
        /**
         * Holds a list of functions to be used when checks are performed.
         *
         * @var Object
         */
        _extras = require('./project_extras');

    /**
     * Checks the project to be ok.
     *
     * @throws Error|EvalError
     */
    this.check = function () {
        for (var i in _mandatory) {
            _mandatory[i](_infos[i]);
        }
        for (var i in _extras) {
            if (self.has(i))
                _extras[i](_infos[i]);
        }
    };

    /**
     * Returns a property of the project.
     *
     * @param {String} key The property name.
     * @return Object|String|Object[]|String[]
     */
    this.get = function (key) {
        return _infos[key];
    };

    /**
     * Returns a property of the project.
     *
     * @param {String} key The property name.
     * @param {String|Object} defValue The default value, if the element isn't defined.
     * If none is specified "-" is used.
     * @return Object|String
     */
    this.getWithDefault = function (key, defValue) {
        if (defValue == null || defValue == undefined)
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
        return _infos[key] != null && _infos[key] != undefined;
    };

    /**
     * Returns all the properties as a dictionary.
     *
     * @return Object
     */
    this.all = function () {
        return _infos;
    };

    /**
     * The main block of the application.
     */
    var mainBlock = function () {
        try {
            _infos = JSON.parse(fs.readFileSync(_filename, 'utf8'));
        } catch (err) {
            throw new Error("File 'project.json' not found");
        }

        if (!self.has('name') || !self.has('version'))
            throw new Error("The project must have a name and a version!");
    };

    mainBlock();

    return this;
};

module.exports = Project;
/**
 * Exports the mandatory checks for the project.
 *
 * @package engine\models
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 20.04.2015
 * @module project
 */
/*jslint node: true */
"use strict";

var Exceptions = require('./../base/exceptions');

/**
 * Exposes all the methods to perform checks.
 *
 * @class
 */
var ProjectMandatory = {};

/**
 * Checks the name of a given project.
 *
 * @protected
 * @param {string} value The value to be checked.
 * @throws Exceptions.EmptyValue|Exceptions.InvalidValue
 * @return boolean
 */
ProjectMandatory.name = function (value) {
    var namePattern = new RegExp("^[a-z0-9_]+(-[a-z0-9_]+)?$", "i");

    if (value === null || value === undefined || value.length === 0)
        throw new Exceptions.EmptyValue("project name");

    if (!namePattern.test(value))
        throw new Exceptions.InvalidValue("project name", value, "spark-omen");

    return true;
};

/**
 * Checks the version of a given project.
 *
 * @protected
 * @param {string} value The value to be checked.
 * @throws Exceptions.EmptyValue|Exceptions.InvalidValue
 * @return boolean
 */
ProjectMandatory.version = function (value) {
    var namePattern = new RegExp("^[0-9]+\.[0-9]+\.[0-9]+$", "i");

    if (value === null || value === undefined || value.length === 0)
        throw new Exceptions.EmptyValue("version");

    if (!namePattern.test(value))
        throw new Exceptions.InvalidValue("version", value, "1.10.102");

    return true;
};

/**
 * Checks the author of a given project.
 *
 * @protected
 * @param {Object} value The value to be checked.
 * @throws Exceptions.EmptyValue|Exceptions.InvalidValue
 * @return boolean
 */
ProjectMandatory.author = function (value) {
    var namePattern = new RegExp("^[a-z \-]*$", "i"),
        emailPattern = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$", "i");

    if (value === null || value === undefined)
        throw new Exceptions.EmptyValue("author");

    if (value.name === null || value.name === undefined || value.name.length === 0)
        throw new Exceptions.EmptyValue("author name");

    if (value.email === null || value.email === undefined || value.email.length === 0)
        throw new Exceptions.EmptyValue("author email");

    if (!namePattern.test(value.name))
        throw new Exceptions.InvalidValue("author name", value.name, "John Doe");
    if (!emailPattern.test(value.email))
        throw new Exceptions.InvalidValue("author email", value.email, "john.doe@gmail.com");

    return true;
};

/**
 * Checks the dependencies of a given project.
 *
 * @protected
 * @param {Object} value The value to be checked.
 * @throws Error|Exceptions.EmptyValue|Exceptions.InvalidValue|Exceptions.InvalidDependencyVersion
 * @return boolean
 */
ProjectMandatory.dependencies = function (value) {
    if (value === null || value === undefined)
        return;

    var namePattern = new RegExp("^[a-z0-9_]+(-[a-z0-9_]+)?$", "i"),
        versionPattern = new RegExp("^(<|>|<=|>=)?([0-9]+).((\\*|[0-9]+)(\.([0-9]+|\\*))?)$", "i");

    for (var key in value) {
        var element = value[key];
        if (key === null || key === undefined || key.length === 0)
            throw new Exceptions.EmptyValue("dependency name");

        if (!namePattern.test(key))
            throw new Exceptions.InvalidValue("dependency name", key, "spark-omen");

        if (element === null || element === undefined || element.length === 0)
            throw new Error("The dependency version for '" + key + "' cannot be empty!");

        if (!versionPattern.test(element))
            throw new Exceptions.InvalidDependencyVersion(key, element);
    }

    return true;
};


module.exports = ProjectMandatory;
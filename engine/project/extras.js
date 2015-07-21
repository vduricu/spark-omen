/**
 * Exports the extra checks for the project.
 *
 * @package engine\project
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
var ProjectExtras = {};

/**
 * Checks the contributor of a given project.
 *
 * @private
 * @param {Object} value The value to be checked.
 * @throws Exceptions.EmptyValue|Exceptions.InvalidValue
 * @return boolean
 */
var _contributor = function (value) {
    var namePattern = new RegExp("^[a-z \-]*$", "i"),
        emailPattern = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "i");

    if (value === null || value === undefined)
        return true;

    if (!Object.isValid(value.name) || value.name.length === 0)
        throw new Exceptions.EmptyValue("contributor name");

    if (!Object.isValid(value.email) || value.email.length === 0)
        throw new Exceptions.EmptyValue("contributor email");

    if (!namePattern.test(value.name))
        throw new Exceptions.InvalidValue('contributor name', value.name, 'John Doe');
    if (!emailPattern.test(value.email))
        throw new Exceptions.InvalidValue('contributor email', value.email, 'john.doe@gmail.com');

    return true;
};

/**
 * Checks the contributors of a given project.
 *
 * @protected
 * @param {Object} value The value to be checked.
 * @throws Exceptions.EmptyValue|Exceptions.InvalidValue|Exceptions.DuplicateValue
 * @return boolean
 */
ProjectExtras.contributors = function (value) {
    for (var mainValue in value) {
        _contributor(value[mainValue]);

        for (var checkValue in value) {
            if (checkValue == mainValue)
                continue;

            if (value[checkValue].name == value[mainValue].name && value[checkValue].email == value[mainValue].email)
                throw new Exceptions.DuplicateValue(value[mainValue].name + " (" + value[mainValue].email + ")");

            if (value[checkValue].email == value[mainValue].email)
                throw new Exceptions.DuplicateValue(value[mainValue].email, value[mainValue].name, value[checkValue].name);

        }
    }

    return true;
};

/**
 * Checks the keywords of a given project.
 *
 * @protected
 * @param {String[]} value The array to be checked.
 * @throws Error|Exceptions.EmptyValue|Exceptions.InvalidValue|Exceptions.DuplicateValue
 * @return boolean
 */
ProjectExtras.keywords = function (value) {
    var keywordPattern = new RegExp("^[a-z0-9 _\-]*$", "i");

    if (value.constructor !== Array)
        throw new Error("Invalid parameter sent!");

    for (var i in value) {
        if (value[i] === null || value[i] === undefined || value[i].length === 0)
            throw new Exceptions.EmptyValue("keyword");

        if (!keywordPattern.test(value[i]))
            throw new Exceptions.InvalidValue("keyword", value[i], "omen, spark, project-omen");

        for (var j in value) {
            if (i == j)
                continue;

            if (value[i] == value[j])
                throw new Exceptions.DuplicateValue(value[i]);
        }
    }

    return true;
};

/**
 * Checks the homepage of a given project.
 *
 * @protected
 * @param {string} value The value to be checked.
 * @throws Exceptions.EmptyValue|Exceptions.InvalidValue
 * @return boolean
 */
ProjectExtras.homepage = function (value) {
    var homepagePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\/?([\/\w \.-]*)*$/gi;

    if (value === null || value === undefined)
        throw new Exceptions.EmptyValue("homepage");

    if (!homepagePattern.test(value))
        throw new Exceptions.InvalidValue("homepage", value, "http://omen.cloud-studio.ro");

    return true;
};

/**
 * Checks the license of a given project.
 *
 * @protected
 * @param {string} value The value to be checked.
 * @throws Exceptions.EmptyValue|Exceptions.InvalidValue
 * @return boolean
 */
ProjectExtras.license = function (value) {
    var licensePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\/?([\/\w \.-]*)*$/gi,
        licenseSPattern = new RegExp("^[a-z \.-]+[a-z0-9 \.-]*$", "i");

    if (value === null || value === undefined)
        throw new Exceptions.EmptyValue("license");

    if (!licensePattern.test(value))
        if (!licenseSPattern.test(value))
            throw new Exceptions.InvalidValue("license", value, "GPL, MIT, or URL to CC");

    return true;
};

/**
 * Checks the name of the source folder to be valid.
 *
 * @protected
 * @param {string|number} value The value to be checked.
 * @throws Exceptions.EmptyValue|Exceptions.InvalidValue
 * @return boolean
 */
ProjectExtras.src = function (value) {
    var sourceFolderPattern = new RegExp("^([a-z0-9 \._][a-z0-9 \.\-_]*\/?)+$", "i");

    if (value === null || value === undefined)
        throw new Exceptions.EmptyValue("src");

    if (!sourceFolderPattern.test(value))
        throw new Exceptions.InvalidValue("src", value);

    return true;
};

module.exports = ProjectExtras;
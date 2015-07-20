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
 * @throws Error|EvalError
 * @return boolean
 */
var _contributor = function (value) {
    var namePattern = new RegExp("^[a-z \-]*$", "i"),
        emailPattern = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "i");

    if (value === null || value === undefined)
        return true;

    if (!Object.isValid(value.name) || value.name.length === 0)
        throw new Error("The contributor name must be filled!");

    if (!Object.isValid(value.email) || value.email.length === 0)
        throw new Error("The contributor email must be filled!");

    if (!namePattern.test(value.name))
        throw new EvalError("The contributor name: '" + value.name + "' is not valid! (example: John Doe)");
    if (!emailPattern.test(value.email))
        throw new EvalError("The contributor email: '" + value.email + "' is not valid! (example: john.doe@gmail.com)");

    return true;
};

/**
 * Checks the contributors of a given project.
 *
 * @protected
 * @param {Object} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
ProjectExtras.contributors = function (value) {
    for (var mainValue in value) {
        _contributor(value[mainValue]);

        for (var checkValue in value) {
            if (checkValue == mainValue)
                continue;

            if (value[checkValue].name == value[mainValue].name && value[checkValue].email == value[mainValue].email)
                throw new Error("Contributor '" + value[mainValue].name + "' with email '" + value[mainValue].email + "' already exists.");

            if (value[checkValue].email == value[mainValue].email)
                throw new Error("Contributor '" + value[mainValue].name + "' " +
                    "and '" + value[checkValue].email + "' have the same email '" + value[mainValue].email + "'.");

        }
    }

    return true;
};

/**
 * Checks the keywords of a given project.
 *
 * @protected
 * @param {String[]} value The array to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
ProjectExtras.keywords = function (value) {
    var keywordPattern = new RegExp("^[a-z0-9 _\-]*$", "i");

    if (value.constructor !== Array)
        throw new Error("Invalid parameter sent!");

    for (var i in value) {
        if (value[i] === null || value[i] === undefined || value[i].length === 0)
            throw new Error("The contributor name must be filled!");

        if (!keywordPattern.test(value[i]))
            throw new EvalError("The keyword '" + value[i] + "' is not valid! (example: omen, spark, project)");

        for (var j in value) {
            if (i == j)
                continue;

            if (value[i] == value[j])
                throw new Error("The keyword '" + value[i] + "' is already defined.");
        }
    }

    return true;
};

/**
 * Checks the homepage of a given project.
 *
 * @protected
 * @param {string} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
ProjectExtras.homepage = function (value) {
    var homepagePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\/?([\/\w \.-]*)*$/gi;

    if (value === null || value === undefined)
        throw new Error("Cannot check the empty value agains pattern.");

    if (!homepagePattern.test(value))
        throw new EvalError("The homepage '" + value + "' is not valid! (example: http://omen.cloud-studio.ro)");

    return true;
};

/**
 * Checks the license of a given project.
 *
 * @protected
 * @param {string} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
ProjectExtras.license = function (value) {
    var licensePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\/?([\/\w \.-]*)*$/gi,
        licenseSPattern = new RegExp("^[a-z \.-]+[a-z0-9 \.-]*$", "i");

    if (value === null || value === undefined)
        throw new Error("Cannot check the empty value agains pattern.");

    if (!licensePattern.test(value))
        if (!licenseSPattern.test(value))
            throw new EvalError("The license '" + value + "' is not valid! (example: GPL, MIT, or URL to CC)");

    return true;
};

/**
 * Checks the name of the source folder to be valid.
 *
 * @protected
 * @param {string|number} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
ProjectExtras.src = function (value) {
    var sourceFolderPattern = new RegExp("^([a-z0-9 \._][a-z0-9 \.\-_]*\/?)+$", "i");

    if (value === null || value === undefined)
        throw new Error("Cannot check the empty value agains pattern.");

    if (!sourceFolderPattern.test(value))
        throw new EvalError("The source folder '" + value + "' is not valid!");

    return true;
};

module.exports = ProjectExtras;
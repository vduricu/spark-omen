/**
 * Exports the extra checks for the project.
 *
 * @package engine\models
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 20.04.2015
 * @module project/extras
 */

/**
 * Exposes all the methods to perform checks.
 *
 * @class
 */
var ProjectExtras = {};

/**
 * Checks the contributor of a given project.
 *
 * @protected
 * @param {Object} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
var _contributor = function (value) {
    var namePattern = new RegExp("^[a-z \-]*$", "i"),
        emailPattern = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "i");

    if (value === null || value === undefined)
        return true;

    if (value.name === null || value.name === undefined || value.name.length === 0)
        throw new Error("The contributor name must be filled!");

    if (value.email === null || value.email === undefined || value.email.length === 0)
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
    for (var i in value) {
        _contributor(value[i]);
    }
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

    for (var i in value) {
        if (!keywordPattern.test(value[i]))
            throw new EvalError("The keyword '" + value[i] + "' is not valid! (example: omen, spark, project)");
    }
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
    var homepagePattern = new RegExp("^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$", "i");

    if (!homepagePattern.test(value))
        throw new EvalError("The homepage '" + value + "' is not valid! (example: http://omen.cloud-studio.ro)");
};

/**
 * Checks the license of a given project.
 *
 *
 * @param {string} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
ProjectExtras.license = function (value) {
    var licensePattern = new RegExp("^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$", "i"),
        licenseSPattern = new RegExp("^[a-z \.-]+[a-z0-9 \.-]*$", "i");

    if (!licensePattern.test(value))
        if (!licenseSPattern.test(value))
            throw new EvalError("The license '" + value + "' is not valid! (example: GPL, MIT, or URL to CC)");
};

module.exports = ProjectExtras;
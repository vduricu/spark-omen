/**
 * Exports the mandatory checks for the project.
 *
 * @package engine\models
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 20.04.2015
 */

/**
 * Exposes all the methods to perform checks.
 *
 * @var Object
 */
var self = {};

/**
 * Checks the name of a given project.
 *
 * @param {string} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
self.name = function (value) {
    var namePattern = new RegExp("^[a-z0-9_]+\/[a-z0-9_]+$", "i");

    if (value === null || value === undefined || value.length === 0)
        throw new Error("The project name cannot be empty!");

    if (!namePattern.test(value))
        throw new EvalError("The project name is not valid! (example: spark/omen)");

    return true;
};

/**
 * Checks the version of a given project.
 *
 * @param {string} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
self.version = function (value) {
    var namePattern = new RegExp("^[0-9]+\.[0-9]+\.[0-9]+$", "i");

    if (value === null || value === undefined || value.length === 0)
        throw new Error("The version cannot be empty!");

    if (!namePattern.test(value))
        throw new EvalError("The version is not valid! (example: 1.10.102)");

    return true;
};

/**
 * Checks the author of a given project.
 *
 * @param {Object} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
self.author = function (value) {
    var namePattern = new RegExp("^[a-z \-]*$", "i"),
        emailPattern = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "i");

    if (value === null || value === undefined)
        throw new Error("The author field must be filled!");

    if (value.name === null || value.name === undefined || value.name.length === 0)
        throw new Error("The author name must be filled!");

    if (value.email === null || value.email === undefined || value.email.length === 0)
        throw new Error("The author email must be filled!");

    if (!namePattern.test(value.name))
        throw new EvalError("The author name: '" + value.name + "' is not valid! (example: John Doe)");
    if (!emailPattern.test(value.email))
        throw new EvalError("The author email: '" + value.email + "' is not valid! (example: john.doe@gmail.com)");

    return true;
};

/**
 * Checks the dependencies of a given project.
 *
 * @param {Object} value The value to be checked.
 * @throws Error|EvalError
 * @return boolean
 */
self.dependencies = function (value) {
    if (value === null || value === undefined)
        return;

    var namePattern = new RegExp("^[a-z0-9_]+\/[a-z0-9_]+$", "i"),
        versionPattern = new RegExp("^(<|>|<=|>=)?([0-9]+).((\\*|[0-9]+)(\.([0-9]+|\\*))?)$", "i");

    for (var key in value) {
        var element = value[key];
        if (key === null || key === undefined || key.length === 0)
            throw new Error("The dependency name cannot be empty!");

        if (!namePattern.test(key))
            throw new EvalError("The dependency name: '" + key + "' is not valid! (example: spark/omen)");

        if (element === null || element === undefined || element.length === 0)
            throw new Error("The dependency version for '" + key + "' cannot be empty!");

        if (!versionPattern.test(element))
            throw new EvalError("The dependency version: '" + element + "' for '" + key + "' is not valid! (example: >3.0.*)");
    }

    return true;
};


module.exports = self;
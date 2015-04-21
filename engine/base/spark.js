/**
 * Version information object.
 *
 * @package engine\base
 * @author Valentin Duricu (valentin (at) duricu.ro)
 * @date 16.04.2015
 */
"use strict";

module.exports = {
    /**
     * Holds the major version number.
     *
     * @var {number}
     */
    major: 0,
    /**
     * Holds the minor version number.
     *
     * @var {number}
     */
    minor: 1,
    /**
     * Holds the sprint number.
     *
     * @var {number}
     */
    sprint: 1,
    /**
     * The codename of the version.
     *
     * @var {string}
     */
    codename: "Tristan Tzara",

    /**
     * Displays the full version of the application.
     *
     * @return String
     */
    version: function () {
        return this.major + "." + this.minor + "." + this.sprint;
    }
};
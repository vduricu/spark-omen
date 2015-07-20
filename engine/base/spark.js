/**
 * Version information object.
 *
 * @package engine\base
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 16.04.2015
 * @module base
 */
/*jslint node: true */
"use strict";

/**
 * Holds information about version.
 *
 * @class Object Spark
 */
var Spark = {
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
    minor: 2,
    /**
     * Holds the sprint number.
     *
     * @var {number}
     */
    stage: 2,
    /**
     * The codename of the version.
     *
     * @var {string}
     */
    codename: "Season 2",

    /**
     * Displays the full version of the application.
     *
     * @return String
     */
    version: function () {
        return this.major + "." + this.minor + "." + this.stage;
    }
};

module.exports = Spark;
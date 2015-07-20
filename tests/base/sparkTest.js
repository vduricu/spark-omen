/**
 * Spark class unit testing
 *
 * @package test/base
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 17.05.2015
 * @module test/base/sparkTest
 */
/*jslint node: true */
"use strict";

var spark = require('../../engine/base/spark');

module.exports = {
    version: function (test) {
        test.expect(3);
        test.equal(spark.major, 0);
        test.equal(spark.minor, 2);
        test.equal(spark.stage, 2);
        test.done();
    }
};
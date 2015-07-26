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

var assert = require("assert");
var spark = require('./../../engine/base/spark');

describe("engine.base.spark", function () {
    describe("version", function () {
        it("should be equal to 0.2.3", function () {
            assert.equal(spark.major, 0);
            assert.equal(spark.minor, 2);
            assert.equal(spark.stage, 3);
        });
    });
});

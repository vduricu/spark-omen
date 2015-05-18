/**
 * Project unit testing
 *
 * @package test/project
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 18.05.2015
 * @module test/project/projectTest
 */
/*jslint node: true */
"use strict";

var Project = require('../../engine/project/project');

var files = {
    simpleCorrect: "./test/packages/simpleCorrect.json",
    invalidName: "./test/packages/invalidName.json",
    invalidVersion: "./test/packages/invalidVersion.json",
    invalidDeps: "./test/packages/invalidDeps.json",
    noDeps: "./test/packages/noDeps.json",
    deps: "./test/packages/deps.json",
    simple: "./test/packages/simple.json"
};

module.exports = {
    testProjectSimpleOk: function (test) {
        var project = new Project(files.simpleCorrect);

        test.doesNotThrow(function () {
            project.check();
        }, Error);

        test.done();
    },
    testIncompleteDefinition: function (test) {
        var project = new Project(files.simple);

        test.throws(function () {
            project.check();
        }, Error);

        test.done();
    },
    testInvalidName: function (test) {
        var project = new Project(files.invalidName);

        test.throws(function () {
            project.check();
        }, EvalError);

        test.done();
    },
    testInvalidVersion: function (test) {
        var project = new Project(files.invalidVersion);

        test.throws(function () {
            project.check();
        }, EvalError);

        test.done();
    },
    testInvalidDeps: function (test) {
        var project = new Project(files.invalidDeps);

        test.throws(function () {
            project.check();
        }, EvalError);

        test.done();
    },
    testNoDeps: function (test) {
        var project = new Project(files.noDeps);

        test.doesNotThrow(function () {
            project.check();
        }, Error);

        test.done();
    },
    testDeps: function (test) {
        var project = new Project(files.deps);

        test.doesNotThrow(function () {
            project.check();
        }, Error);

        test.done();
    }
};
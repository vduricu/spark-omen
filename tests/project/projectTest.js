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
    simpleCorrect: "./tests/packages/simpleCorrect.json",
    invalidName: "./tests/packages/invalidName.json",
    invalidVersion: "./tests/packages/invalidVersion.json",
    invalidDeps: "./tests/packages/invalidDeps.json",
    noDeps: "./tests/packages/noDeps.json",
    deps: "./tests/packages/deps.json",
    simple: "./tests/packages/simple.json"
};

module.exports = {
    testProjectSimpleOk: function (test) {
        var project = new Project(files.simpleCorrect);

        test.doesNotThrow(function () {
            project.check();
        }, Error);

        test.equal(project.get('name'), "test/simple");
        test.equal(project.get('version'), "0.1.2");
        var author = project.get('author');
        test.equal(author.name, "Tester");
        test.equal(author.email, "test@duricu.ro");

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
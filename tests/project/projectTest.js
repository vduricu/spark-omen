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

var assert = require("assert");

var Project = require('../../engine/project/project'),
    Exceptions = require('./../../engine/base/exceptions');

var files = {
    simpleCorrect: "./tests/packages/simpleCorrect.json",
    invalidName: "./tests/packages/invalidName.json",
    invalidVersion: "./tests/packages/invalidVersion.json",
    invalidDeps: "./tests/packages/invalidDeps.json",
    noDeps: "./tests/packages/noDeps.json",
    deps: "./tests/packages/deps.json",
    simple: "./tests/packages/simple.json"
};

describe("engine.project.project", function () {
    it("simple project should be ok", function () {
        var project = new Project(files.simpleCorrect);

        assert.doesNotThrow(function () {
            project.check();
        }, Error);

        assert.equal(project.get('name'), "test-simple");
        assert.equal(project.get('version'), "0.1.2");
        var author = project.get('author');
        assert.equal(author.name, "Tester");
        assert.equal(author.email, "test@duricu.ro");
    });

    it("incomplete definition should not be ok", function () {
        var project = new Project(files.simple);

        assert.throws(function () {
            project.check();
        }, Exceptions.InvalidValue);
    });

    it("invalid name should not be ok", function () {
        var project = new Project(files.invalidName);

        assert.throws(function () {
            project.check();
        }, Exceptions.InvalidValue);
    });

    it("invalid version should not be ok", function () {
        var project = new Project(files.invalidVersion);

        assert.throws(function () {
            project.check();
        }, Exceptions.InvalidValue);
    });

    it("invalid dependencies should not be ok", function () {
        var project = new Project(files.invalidDeps);

        assert.throws(function () {
            project.check();
        }, Exceptions.InvalidValue);
    });

    it("no dependencies should be ok", function () {
        var project = new Project(files.noDeps);

        assert.doesNotThrow(function () {
            project.check();
        }, Error);
    });

    it("dependencies should be ok", function () {
        var project = new Project(files.deps);

        assert.doesNotThrow(function () {
            project.check();
        }, Error);
    });
});
/**
 * Mandatory checks unit testing
 *
 * @package test/project
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 18.05.2015
 * @module test/project/mandatoryTest
 */
/*jslint node: true */
"use strict";

var assert = require("assert");

var Mandatory = require('./../../engine/project/mandatory'),
    Exceptions = require('./../../engine/base/exceptions');

describe("engine.project.mandatory", function () {
    describe("name", function () {
        it("value should be ok", function () {
            assert.doesNotThrow(function () {
                Mandatory.name("test-test");
            }, Error);
            assert.doesNotThrow(function () {
                Mandatory.name("test");
            }, Error);
        });

        it("empty value should not be ok", function () {
            assert.throws(function () {
                Mandatory.name("");
            }, Exceptions.EmptyValue);

            assert.throws(function () {
                Mandatory.name();
            }, Exceptions.EmptyValue);
        });

        it("invalid values should not be ok", function () {
            assert.throws(function () {
                Mandatory.name("/test");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Mandatory.name("test/test-test");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Mandatory.name("test#test");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Mandatory.name("test/test");
            }, Exceptions.InvalidValue);
        });
    });

    describe("version", function () {
        it("value should be ok", function () {
            assert.doesNotThrow(function () {
                Mandatory.version("1.0.1");
            }, Error);
        });

        it("empty value should not be ok", function () {
            assert.throws(function () {
                Mandatory.version("");
            }, Exceptions.EmptyValue);

            assert.throws(function () {
                Mandatory.version();
            }, Exceptions.EmptyValue);
        });

        it("invalid values should not be ok", function () {
            assert.throws(function () {
                Mandatory.version("test");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Mandatory.version("1.#.t");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Mandatory.version(">1.t.1");
            }, Exceptions.InvalidValue);
        });
    });

    describe("author", function () {
        it("value should be ok", function () {
            var author = {
                name: "Tester",
                email: "tester@duricu.ro"
            };

            assert.doesNotThrow(function () {
                Mandatory.author(author);
            }, Error);
        });

        it("empty value should not be ok", function () {
            assert.throws(function () {
                Mandatory.author({});
            }, Exceptions.EmptyValue);
            assert.throws(function () {
                Mandatory.author();
            }, Exceptions.EmptyValue);
        });

        it("empty name should not be ok", function () {
            var author = {
                name: "",
                email: "tester@duricu.ro"
            };

            assert.throws(function () {
                Mandatory.author(author);
            }, Exceptions.EmptyValue);
        });

        it("empty email should not be ok", function () {
            var author = {
                name: "Tester",
                email: ""
            };

            assert.throws(function () {
                Mandatory.author(author);
            }, Exceptions.EmptyValue);
        });

        it("invalid email should not be ok", function () {
            var author = {
                name: "Tester",
                email: "gigel22r"
            };

            assert.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            author = {
                name: "Tester",
                email: "gi#gel@dorel"
            };

            assert.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            author = {
                name: "Tester",
                email: "dodel@gigel.computer.3"
            };

            assert.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);
        });

        it("invalid name should not be ok", function () {
            var author = {
                name: "Tester1nVaL1#",
                email: "ok@duricu.ro"
            };

            assert.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            author = {
                name: "Tester 134",
                email: "ok@duricu.ro"
            };

            assert.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            author = {
                name: "Tester Inva.lid",
                email: "ok@duricu.ro"
            };

            assert.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);
        });
    });
});
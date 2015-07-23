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

var Mandatory = require('./../../engine/project/mandatory'),
    Exceptions = require('./../../engine/base/exceptions');

module.exports = {
    name: {
        testOk: function (test) {
            test.expect(2);

            test.doesNotThrow(function () {
                Mandatory.name("test-test");
            }, Error);
            test.doesNotThrow(function () {
                Mandatory.name("test");
            }, Error);

            test.done();
        },
        testEmpty: function (test) {
            test.expect(2);

            test.throws(function () {
                Mandatory.name("");
            }, Exceptions.EmptyValue);

            test.throws(function () {
                Mandatory.name();
            }, Exceptions.EmptyValue);

            test.done();
        },
        testInvalid: function (test) {
            test.expect(1);

            test.throws(function () {
                Mandatory.name("/test");
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalid2: function (test) {
            test.expect(1);

            test.throws(function () {
                Mandatory.name("test/test-test");
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalid3: function (test) {
            test.expect(1);

            test.throws(function () {
                Mandatory.name("test#test");
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalid4: function (test) {
            test.expect(1);

            test.throws(function () {
                Mandatory.name("test/test");
            }, Exceptions.InvalidValue);

            test.done();
        }
    },
    version: {
        testOk: function (test) {
            test.expect(1);

            test.doesNotThrow(function () {
                Mandatory.version("1.0.1");
            }, Error);

            test.done();
        },
        testEmpty: function (test) {
            test.expect(2);

            test.throws(function () {
                Mandatory.version("");
            }, Exceptions.EmptyValue);

            test.throws(function () {
                Mandatory.version();
            }, Exceptions.EmptyValue);

            test.done();
        },
        testInvalid: function (test) {
            test.expect(1);

            test.throws(function () {
                Mandatory.version("test");
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalid2: function (test) {
            test.expect(1);

            test.throws(function () {
                Mandatory.version("1.#.t");
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalid3: function (test) {
            test.expect(1);

            test.throws(function () {
                Mandatory.version(">1.t.1");
            }, Exceptions.InvalidValue);

            test.done();
        }
    },
    author: {
        testOk: function (test) {
            test.expect(1);
            var author = {
                name: "Tester",
                email: "tester@duricu.ro"
            };

            test.doesNotThrow(function () {
                Mandatory.author(author);
            }, Error);

            test.done();
        },
        testEmpty: function (test) {
            test.expect(1);

            test.throws(function () {
                Mandatory.author({});
            }, Exceptions.EmptyValue);

            test.done();
        },
        testEmptyName: function (test) {
            test.expect(1);
            var author = {
                name: "",
                email: "tester@duricu.ro"
            };

            test.throws(function () {
                Mandatory.author(author);
            }, Exceptions.EmptyValue);

            test.done();
        },
        testEmptyEmail: function (test) {
            test.expect(1);
            var author = {
                name: "Tester",
                email: ""
            };

            test.throws(function () {
                Mandatory.author(author);
            }, Exceptions.EmptyValue);

            test.done();
        },
        testInvalidEmail: function (test) {
            test.expect(1);
            var author = {
                name: "Tester",
                email: "gigel22r"
            };

            test.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalidEmail2: function (test) {
            test.expect(1);
            var author = {
                name: "Tester",
                email: "gi#gel@dorel"
            };

            test.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalidEmail3: function (test) {
            test.expect(1);
            var author = {
                name: "Tester",
                email: "dodel@gigel.computer.3"
            };

            test.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalidName: function (test) {
            test.expect(1);
            var author = {
                name: "Tester1nVaL1#",
                email: "ok@duricu.ro"
            };

            test.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalidName2: function (test) {
            test.expect(1);
            var author = {
                name: "Tester 134",
                email: "ok@duricu.ro"
            };

            test.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalidName3: function (test) {
            test.expect(1);
            var author = {
                name: "Tester Inva.lid",
                email: "ok@duricu.ro"
            };

            test.throws(function () {
                Mandatory.author(author);
            }, Exceptions.InvalidValue);

            test.done();
        }
    }

};
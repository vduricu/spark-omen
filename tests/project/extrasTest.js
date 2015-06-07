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

var Extras = require('../../engine/project/extras');

module.exports = {
    contributors: {
        testOk1: function (test) {
            test.expect(1);

            test.doesNotThrow(function () {
                Extras.contributors([{
                    "name": "Tester Unu",
                    "email": "email@duricu.ro"
                }]);
            }, Error);

            test.done();
        },
        testOkN: function (test) {
            test.expect(1);

            var contributors = [
                {
                    "name": "Tester Unu",
                    "email": "email@duricu.ro"
                },
                {
                    "name": "Tester Doi",
                    "email": "doi@duricu.ro"
                },
                {
                    "name": "Tester Trei",
                    "email": "third@duricu.ro"
                }
            ];

            test.doesNotThrow(function () {
                Extras.contributors(contributors);
            }, Error);

            test.done();
        },
        testEmptyList: function (test) {
            test.expect(1);

            test.doesNotThrow(function () {
                Extras.contributors([]);
            }, Error);

            test.done();
        },
        testEmptyName: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.contributors([
                    {
                        "name": "",
                        "email": "email@duricu.ro"
                    }
                ]);
            }, Error);

            test.done();
        },
        testEmptyEmail: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.contributors([
                    {
                        "name": "Tester",
                        "email": ""
                    }
                ]);
            }, Error);

            test.done();
        },
        testEmptyBoth: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.contributors([
                    {
                        "name": "",
                        "email": ""
                    }
                ]);
            }, Error);

            test.done();
        },
        testInvalidName: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.contributors([
                    {
                        "name": "T3Ster App",
                        "email": "email@duricu.ro"
                    }
                ]);
            }, Error);

            test.done();
        },
        testInvalidEmailName: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.contributors([
                    {
                        "name": "T3Ster App",
                        "email": "email###"
                    }
                ]);
            }, Error);

            test.done();
        },
        testInvalidEmail: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.contributors([
                    {
                        "name": "Tester App",
                        "email": "email#duricu.ro"
                    }
                ]);
            }, Error);

            test.done();
        },
        testDuplicateEmail: function (test) {
            test.expect(1);

            var contributors = [
                {
                    "name": "Tester Unu",
                    "email": "email@duricu.ro"
                },
                {
                    "name": "Tester Doi",
                    "email": "email@duricu.ro"
                }
            ];

            test.throws(function () {
                Extras.contributors(contributors);
            }, Error);

            test.done();
        },
        testDuplicateNameEmail: function (test) {
            test.expect(1);

            var contributors = [
                {
                    "name": "Tester Unu",
                    "email": "email@duricu.ro"
                },
                {
                    "name": "Tester Unu",
                    "email": "email@duricu.ro"
                }
            ];

            test.throws(function () {
                Extras.contributors(contributors);
            }, Error);

            test.done();
        },
        testDuplicateName: function (test) {
            test.expect(1);

            var contributors = [
                {
                    "name": "Tester Unu",
                    "email": "email.unu@duricu.ro"
                },
                {
                    "name": "Tester Unu",
                    "email": "tester.unu@duricu.ro"
                }
            ];

            test.doesNotThrow(function () {
                Extras.contributors(contributors);
            }, Error);

            test.done();
        },
        testInvalidParameters: function (test) {
            test.expect(1);
            
            test.throws(function(){
                Extras.contributors("666");
            }, Error);

            test.done();
        }
    },

    keywords: {
        testOk1: function (test) {
            test.expect(1);

            test.doesNotThrow(function () {
                Extras.keywords(["keyword"]);
            }, Error);

            test.done();
        },
        testOkN: function (test) {
            test.expect(1);

            test.doesNotThrow(function () {
                Extras.keywords(["keyword1", "keyword2", "keywordn"]);
            }, Error);

            test.done();
        },
        testEmptyList: function (test) {
            test.expect(1);

            test.doesNotThrow(function () {
                Extras.contributors([]);
            }, Error);

            test.done();
        },
        testEmptyKeyword: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.keywords([""]);
            }, Error);

            test.done();
        },
        testInvalidKeyword: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.keywords(["k3yw0r#"]);
            }, Error);

            test.done();
        },
        testDuplicate: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.keywords(["keyword", "keyword"]);
            }, Error);

            test.done();
        },
        testInvalidParameters: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.keywords(12333);
            }, Error);

            test.done();
        }
    },

    homepage: {
        testOk: function (test) {
            test.expect(1);

            test.doesNotThrow(function () {
                Extras.homepage("http://omen.cloud-studio.ro");
            }, Error);

            test.done();
        },
        testEmpty: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.homepage("");
            }, Error);

            test.done();
        },
        testInvalid: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.homepage("ht##:\\regular");
            }, Error);

            test.done();
        },
        testInvalidParameters: function (test) {
            test.expect(2);

            test.throws(function () {
                Extras.homepage([]);
            }, Error);

            test.throws(function () {
                Extras.homepage({});
            }, Error);

            test.done();
        }
    },

    license: {
        testOkName: function (test) {
            test.expect(1);

            test.doesNotThrow(function () {
                Extras.license("GPL V.3");
            }, Error);

            test.done();
        },
        testOkUrl: function (test) {
            test.expect(1);

            test.doesNotThrow(function () {
                Extras.license("http://duricu.ro/license.html");
            }, Error);

            test.done();
        },
        testEmpty: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.homepage("");
            }, Error);

            test.done();
        },
        testInvalid: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.homepage("ht##:\\regular");
            }, Error);

            test.done();
        },
        testInvalid2: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.homepage("G3P3L3 ###");
            }, Error);

            test.done();
        },
        testInvalidParameters: function (test) {
            test.expect(2);

            test.throws(function () {
                Extras.homepage([]);
            }, Error);

            test.throws(function () {
                Extras.homepage({});
            }, Error);

            test.done();
        }
    }

};
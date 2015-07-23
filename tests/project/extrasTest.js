/**
 * Extra fields checks unit testing
 *
 * @package test/project
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 18.05.2015
 * @module test/project/mandatoryTest
 */
/*jslint node: true */
"use strict";

var Extras = require('./../../engine/project/extras'),
    Exceptions = require('./../../engine/base/exceptions');

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
            }, Exceptions.EmptyValue);

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
            }, Exceptions.EmptyValue);

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
            }, Exceptions.EmptyValue);

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
            }, Exceptions.InvalidValue);

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
            }, Exceptions.InvalidValue);

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
            }, Exceptions.InvalidValue);

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
            }, Exceptions.DuplicateValue);

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
            }, Exceptions.DuplicateValue);

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

            test.throws(function () {
                Extras.contributors("666");
            }, Exceptions.InvalidValue);

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
            }, Exceptions.EmptyValue);

            test.done();
        },
        testEmptyKeyword: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.keywords([""]);
            }, Exceptions.EmptyValue);

            test.done();
        },
        testInvalidKeyword: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.keywords(["k3yw0r#"]);
            }, Exceptions.InvalidValue);

            test.done();
        },
        testDuplicate: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.keywords(["keyword", "keyword"]);
            }, Exceptions.DuplicateValue);

            test.done();
        },
        testInvalidParameters: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.keywords(12333);
            }, Exceptions.InvalidValue);

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
            test.expect(2);

            test.throws(function () {
                Extras.homepage("");
            }, Exceptions.EmptyValue);

            test.throws(function () {
                Extras.homepage();
            }, Exceptions.EmptyValue);

            test.done();
        },
        testInvalid: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.homepage("ht##:\\regular");
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalidParameters: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.homepage({});
            }, Exceptions.InvalidValue);

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
            test.expect(2);

            test.throws(function () {
                Extras.license("");
            }, Exceptions.EmptyValue);

            test.throws(function () {
                Extras.license();
            }, Exceptions.EmptyValue);

            test.done();
        },
        testInvalid: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.license("ht##:\\regular");
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalid2: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.license("G3P3L3 ###");
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalidParameters: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.license([]);
            }, Exceptions.InvalidValue);

            test.done();
        }
    },

    src: {
        testOkSource: function (test) {
            test.expect(5);

            test.doesNotThrow(function () {
                Extras.src("source");
            }, Error);

            test.doesNotThrow(function () {
                Extras.src("src/adm2");
            }, Error);

            test.doesNotThrow(function () {
                Extras.src("src.32_qq/adm.32");
            }, Error);

            test.doesNotThrow(function () {
                Extras.src("_qq/adm.32");
            }, Error);

            test.doesNotThrow(function () {
                Extras.src(".pq");
            }, Error);

            test.done();
        },
        testEmpty: function (test) {
            test.expect(1);

            test.throws(function () {
                Extras.src("");
            }, Exceptions.EmptyValue);

            test.done();
        },
        testInvalid: function (test) {
            test.expect(6);

            test.throws(function () {
                Extras.src("32-aaqqq");
            }, Exceptions.InvalidValue);

            test.throws(function () {
                Extras.src("#ana#");
            }, Exceptions.InvalidValue);

            test.throws(function () {
                Extras.src(".correct/a#3");
            }, Exceptions.InvalidValue);

            test.throws(function () {
                Extras.src("{.correct/a#3}");
            }, Exceptions.InvalidValue);

            test.throws(function () {
                Extras.src("$122");
            }, Exceptions.InvalidValue);

            test.throws(function () {
                Extras.src({} + 123);
            }, Exceptions.InvalidValue);

            test.done();
        },
        testInvalidParameters: function (test) {
            test.expect(3);

            test.throws(function () {
                Extras.src();
            }, Exceptions.InvalidValue);

            test.throws(function () {
                Extras.src([]);
            }, Exceptions.InvalidValue);

            test.throws(function () {
                Extras.src({});
            }, Exceptions.InvalidValue);

            test.done();
        }
    }

};
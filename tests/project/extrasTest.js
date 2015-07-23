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
var assert = require("assert");

var Extras = require('./../../engine/project/extras'),
    Exceptions = require('./../../engine/base/exceptions');

describe("engine.project.extras", function () {
    describe("contributors", function () {
        it("one should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.contributors([{
                    "name": "Tester Unu",
                    "email": "email@duricu.ro"
                }]);
            }, Error);
        });

        it("two or more should be ok", function () {
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
            assert.doesNotThrow(function () {
                Extras.contributors(contributors);
            }, Error);
        });

        it("empty list should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.contributors([]);
            }, Error);
        });

        it("empty name should not be ok", function () {
            assert.throws(function () {
                Extras.contributors([
                    {
                        "name": "",
                        "email": "email@duricu.ro"
                    }
                ]);
            }, Exceptions.EmptyValue);
        });

        it("empty email should not be ok", function () {
            assert.throws(function () {
                Extras.contributors([
                    {
                        "name": "Tester",
                        "email": ""
                    }
                ]);
            }, Exceptions.EmptyValue);
        });

        it("empty name and email should not be ok", function () {
            assert.throws(function () {
                Extras.contributors([
                    {
                        "name": "",
                        "email": ""
                    }
                ]);
            }, Exceptions.EmptyValue);
        });

        it("invalid name should not be ok", function () {
            assert.throws(function () {
                Extras.contributors([
                    {
                        "name": "T3Ster App",
                        "email": "email@duricu.ro"
                    }
                ]);
            }, Exceptions.InvalidValue);
        });

        it("invalid email should not be ok", function () {
            assert.throws(function () {
                Extras.contributors([
                    {
                        "name": "Tester App",
                        "email": "email#duricu.ro"
                    }
                ]);
            }, Exceptions.InvalidValue);
        });

        it("invalid name and email should not be ok", function () {
            assert.throws(function () {
                Extras.contributors([
                    {
                        "name": "T3Ster App",
                        "email": "email###"
                    }
                ]);
            }, Exceptions.InvalidValue);
        });

        it("duplicate name should be ok", function () {
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

            assert.doesNotThrow(function () {
                Extras.contributors(contributors);
            }, Error);
        });

        it("duplicate email should not be ok", function () {
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

            assert.throws(function () {
                Extras.contributors(contributors);
            }, Exceptions.DuplicateValue);
        });

        it("duplicate name and email should not be ok", function () {
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

            assert.throws(function () {
                Extras.contributors(contributors);
            }, Exceptions.DuplicateValue);
        });

        it("invalid parameters should not be ok", function () {
            assert.throws(function () {
                Extras.contributors("666");
            }, Exceptions.InvalidValue);
        });
    });

    describe("keywords", function () {
        it("one should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.keywords(["keyword"]);
            }, Error);
        });

        it("two or more should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.keywords(["keyword1", "keyword2", "keywordn"]);
            }, Error);
        });

        it("empty list should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.contributors([]);
            }, Exceptions.EmptyValue);
        });

        it("empty keywords should not be ok", function () {
            assert.throws(function () {
                Extras.keywords([""]);
            }, Exceptions.EmptyValue);
        });

        it("invalid keyword should not be ok", function () {
            assert.throws(function () {
                Extras.keywords(["k3yw0r#"]);
            }, Exceptions.InvalidValue);
        });

        it("duplicate keywords should not be ok", function () {
            assert.throws(function () {
                Extras.keywords(["keyword", "keyword"]);
            }, Exceptions.DuplicateValue);
        });

        it("invalid parameters should not be ok", function () {
            assert.throws(function () {
                Extras.keywords(12333);
            }, Exceptions.InvalidValue);
        });
    });

    describe("homepage", function () {
        it("name should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.license("GPL V.3");
            }, Error);
        });

        it("url should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.license("http://duricu.ro/license.html");
            }, Error);
        });

        it("empty value should not be ok", function () {
            assert.throws(function () {
                Extras.license("");
            }, Exceptions.EmptyValue);

            assert.throws(function () {
                Extras.license();
            }, Exceptions.EmptyValue);
        });

        it("invalid name should not be ok", function () {
            assert.throws(function () {
                Extras.license("G3P3L3 ###");
            }, Exceptions.InvalidValue);
        });

        it("invalid url should not be ok", function () {
            assert.throws(function () {
                Extras.license("ht##:\\regular");
            }, Exceptions.InvalidValue);
        });

        it("invalid parameters should not be ok", function () {
            assert.throws(function () {
                Extras.license([]);
            }, Exceptions.InvalidValue);
        });
    });
    describe("license", function () {
        it("one should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.keywords(["keyword"]);
            }, Error);
        });

        it("two or more should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.keywords(["keyword1", "keyword2", "keywordn"]);
            }, Error);
        });

        it("empty list should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.contributors([]);
            }, Exceptions.EmptyValue);
        });

        it("empty keywords should not be ok", function () {
            assert.throws(function () {
                Extras.keywords([""]);
            }, Exceptions.EmptyValue);
        });

        it("invalid keyword should not be ok", function () {
            assert.throws(function () {
                Extras.keywords(["k3yw0r#"]);
            }, Exceptions.InvalidValue);
        });

        it("duplicate keywords should not be ok", function () {
            assert.throws(function () {
                Extras.keywords(["keyword", "keyword"]);
            }, Exceptions.DuplicateValue);
        });

        it("invalid parameters should not be ok", function () {
            assert.throws(function () {
                Extras.keywords(12333);
            }, Exceptions.InvalidValue);
        });
    });
    describe("src", function () {
        it("value should be ok", function () {
            assert.doesNotThrow(function () {
                Extras.src("source");
            }, Error);

            assert.doesNotThrow(function () {
                Extras.src("src/adm2");
            }, Error);

            assert.doesNotThrow(function () {
                Extras.src("src.32_qq/adm.32");
            }, Error);

            assert.doesNotThrow(function () {
                Extras.src("_qq/adm.32");
            }, Error);

            assert.doesNotThrow(function () {
                Extras.src(".pq");
            }, Error);
        });

        it("empty value should not be ok", function () {
            assert.throws(function () {
                Extras.src("");
            }, Exceptions.EmptyValue);

            assert.throws(function () {
                Extras.src();
            }, Exceptions.EmptyValue);
        });

        it("invalid value should not be ok", function () {
            assert.throws(function () {
                Extras.src("32-aaqqq");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Extras.src("#ana#");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Extras.src(".correct/a#3");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Extras.src("{.correct/a#3}");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Extras.src("$122");
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Extras.src({} + 123);
            }, Exceptions.InvalidValue);
        });

        it("invalid parameters should not be ok", function () {
            assert.throws(function () {
                Extras.src();
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Extras.src([]);
            }, Exceptions.InvalidValue);

            assert.throws(function () {
                Extras.src({});
            }, Exceptions.InvalidValue);
        });
    });
});

/**
 * Testing the general utilities
 *
 * @package tests/utils
 * @author valentin
 * @date 26.07.2015
 * @module utils
 */
/*jslint node: true */
"use strict";

var assert = require("assert");

describe("engine.utils.general", function () {
    require("./../../engine/utils/general");

    describe("string.startsWith", function () {
        it("empty string", function () {
            assert.equal("".startsWith("test"), false);
            assert.equal("".startsWith(""), true);
        });

        it("non-empty string starting with", function () {
            assert.equal("testing test".startsWith("test"), true);
            assert.equal("testing test".startsWith("testing"), true);
        });

        it("non-empty string not starting with", function () {
            assert.equal("retesting test".startsWith("test"), false);
            assert.equal("retesting test".startsWith("testing"), false);
        });
    });

    describe("string.endsWith", function () {
        it("empty string", function () {
            assert.equal("".endsWith("test"), false);
            assert.equal("".endsWith(""), true);
        });

        it("non-empty string ending with", function () {
            assert.equal("testing test".endsWith("test"), true);
            assert.equal("testing test".endsWith("ing test"), true);
        });

        it("non-empty string not ending with", function () {
            assert.equal("retesting tester".endsWith("test"), false);
            assert.equal("retesting test".endsWith("testing"), false);
        });
    });

    describe("object.isValid", function () {
        it("empty object", function () {
            assert.equal(Object.isValid(""), true);
            assert.equal(Object.isValid(0), true);
            assert.equal(Object.isValid({}), true);
            assert.equal(Object.isValid([]), true);
            assert.equal(Object.isValid(null), false);
            assert.equal(Object.isValid(undefined), false);
            assert.equal(Object.isValid(), false);
        });
        it("non-empty object", function () {
            assert.equal(Object.isValid("test"), true);
            assert.equal(Object.isValid(12), true);
            assert.equal(Object.isValid([1, "test", {}]), true);
            assert.equal(Object.isValid({test: '123'}), true);
        });
    });
});

describe("engine.utils.general (re-required)", function () {
    var name = require.resolve("./../../engine/utils/general");
    delete require.cache[name];
    require("./../../engine/utils/general");

    describe("string.startsWith", function () {
        it("empty string", function () {
            assert.equal("".startsWith("test"), false);
            assert.equal("".startsWith(""), true);
        });

        it("non-empty string starting with", function () {
            assert.equal("testing test".startsWith("test"), true);
            assert.equal("testing test".startsWith("testing"), true);
        });

        it("non-empty string not starting with", function () {
            assert.equal("retesting test".startsWith("test"), false);
            assert.equal("retesting test".startsWith("testing"), false);
        });
    });

    describe("string.endsWith", function () {
        it("empty string", function () {
            assert.equal("".endsWith("test"), false);
            assert.equal("".endsWith(""), true);
        });

        it("non-empty string ending with", function () {
            assert.equal("testing test".endsWith("test"), true);
            assert.equal("testing test".endsWith("ing test"), true);
        });

        it("non-empty string not ending with", function () {
            assert.equal("retesting tester".endsWith("test"), false);
            assert.equal("retesting test".endsWith("testing"), false);
        });
    });

    describe("object.isValid", function () {
        it("empty object", function () {
            assert.equal(Object.isValid(""), true);
            assert.equal(Object.isValid(0), true);
            assert.equal(Object.isValid({}), true);
            assert.equal(Object.isValid([]), true);
            assert.equal(Object.isValid(null), false);
            assert.equal(Object.isValid(undefined), false);
            assert.equal(Object.isValid(), false);
        });
        it("non-empty object", function () {
            assert.equal(Object.isValid("test"), true);
            assert.equal(Object.isValid(12), true);
            assert.equal(Object.isValid([1, "test", {}]), true);
            assert.equal(Object.isValid({test: '123'}), true);
        });
    });
});
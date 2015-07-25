/**
 * Omen API testing
 *
 * @package tests/utils
 * @author valentin
 * @date 26.07.2015
 * @module utils
 */
/*jslint node: true */
"use strict";

var assert = require("assert");
var OmenAPI = require("./../../engine/utils/omenApi");

describe("engine.utils.omenapi", function () {
    before(function () {
        global.OMEN_ENV = {};
        global.OMEN_ENV.url = "http://omen.test";
    });

    it("buildURL", function () {
        assert.equal(OmenAPI.buildURL("test"), "http://omen.test/api/v1/test");
        assert.equal(OmenAPI.buildURL(""), "http://omen.test/api/v1/");
    });
});
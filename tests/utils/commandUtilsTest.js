/**
 * Testing the command launching utilities
 *
 * @package tests/utils
 * @author valentin
 * @date 25.07.2015
 * @module utils
 */
/*jslint node: true */
"use strict";

var assert = require("assert");

var CommandUtils = require("./../../engine/utils/commandUtils"),
    Exceptions = require("./../../engine/base/exceptions");

describe("engine.utils.commandUtils", function () {
    var _messages = [];

    before(function () {
        var cliDemo = {
            getUsage: function () {
                return "Usage test";
            }
        };
        ["header", "end", "ok", "info", "error"].forEach(function (element) {
            cliDemo[element] = function (data) {
                _messages.push(data);
            };
        });
        CommandUtils.SetInit(cliDemo, "project.gson");
    });

    beforeEach(function () {
        _messages = [];
    });

    it("execute existing command", function () {
        var cmd = CommandUtils.CommandExecutor("version");
        assert.equal(cmd.commandName, "version");
        cmd.run();
        assert.notEqual(_messages.length, 0);
    });

    it("execute existing command with error", function () {
        var cmd = CommandUtils.CommandExecutor("about");
        assert.equal(cmd.commandName, "about");
        assert.throws(function () {
            cmd.run();
        }, Exceptions.FileNotFound);
        assert.equal(_messages.length, 0);
    });

    it("execute non-existing command", function () {
        assert.equal(CommandUtils.CommandExecutor(), "Usage test");
        assert.equal(_messages.length, 0);
    });

    it("execute empty command", function () {
        assert.equal(CommandUtils.CommandExecutor(), "Usage test");
        assert.equal(_messages.length, 0);
    });
});
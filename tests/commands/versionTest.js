/**
 * Version command unit testing
 *
 * @package test/commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 18.05.2015
 * @module test/commands/versionTest
 */
/*jslint node: true */
"use strict";

var assert = require("assert");

var Command   = require('../../engine/commands/version'),
    uiMockup = require('../../engine/testing/uiMockup'),
    Exceptions = require("./../../engine/base/exceptions");

var filename = "../packages/simple.json",
    cmd, cli;

describe("engine.commands.version", function () {
    describe("run", function () {

        before(function() {
            cmd = new Command();
            cli = new uiMockup();
            cli.clearAll();
            cmd.init(cli, filename);
        });

        it("should run", function () {
            var cmd = new Command();

            assert.equal(cmd.cli, cli);
            assert.equal(cmd.filename, "../packages/simple.json");
            assert.equal(cmd.commandName, "version");
            assert.doesNotThrow(function () {
                cmd.run();
            }, Exceptions.CommandNotImplemented);
            assert.equal(cli.getAll().length, 6);

        });
    });
});

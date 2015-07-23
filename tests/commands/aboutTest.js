/**
 * About command unit testing
 *
 * @package test/commands
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 18.05.2015
 * @module test/commands/versionTest
 */
/*jslint node: true */
"use strict";

var assert = require("assert");

var Command = require('../../engine/commands/about'),
    uiMockup = require('../../engine/testing/uiMockup'),
    Exceptions = require("./../../engine/base/exceptions");

var simple = "./tests/packages/simple.json",
    deps = "./tests/packages/deps.json",
    noDeps = "./tests/packages/noDeps.json",
    cmd, cli;

describe("engine.commands.about", function () {
    describe("run", function () {

        before(function () {
            cmd = new Command();
            cli = new uiMockup();
        });

        beforeEach(function () {
            cli.clearAll();
        });

        it("simple file", function () {
            cmd.init(cli, simple);

            assert.equal(cmd.cli, cli);
            assert.equal(cmd.filename, simple);
            assert.equal(cmd.commandName, "about");

            assert.doesNotThrow(function () {
                cmd.run();
            }, Exceptions.CommandNotImplemented);

            var cliLines = cli.getAll();

            assert.equal(cliLines.length, 10);
            for (var i in cliLines) {
                if (i < 3)
                    assert.equal(cliLines[i].type, "header");
                else if (i == cliLines.length - 1)
                    assert.equal(cliLines[i].type, "end");
                else
                    assert.equal(cliLines[i].type, "ok");
            }

            assert.equal(cliLines[3].message, "Name:\t\ttest-simple");
            assert.equal(cliLines[4].message, "Version:\t\t0.1.2");
        });
        it("no dependencies", function () {
            cmd.init(cli, noDeps);

            assert.equal(cmd.cli, cli);
            assert.equal(cmd.filename, noDeps);
            assert.equal(cmd.commandName, "about");

            assert.doesNotThrow(function () {
                cmd.run(noDeps);
            }, Exceptions.CommandNotImplemented);

            var cliLines = cli.getAll();

            assert.equal(cliLines.length, 16);
            for (var i in cliLines) {
                if (i < 3)
                    assert.equal(cliLines[i].type, "header");
                else if (i == cliLines.length - 1)
                    assert.equal(cliLines[i].type, "end");
                else
                    assert.equal(cliLines[i].type == "ok" || cliLines[i].type == "separator", true);
            }

            assert.equal(cliLines[3].message, "Name:\t\ttest-noDeps");
            assert.equal(cliLines[4].message, "Version:\t\t0.1.1");
        });
        it("dependencies", function () {
            cmd.init(cli, deps);

            assert.equal(cmd.cli, cli);
            assert.equal(cmd.filename, deps);
            assert.equal(cmd.commandName, "about");

            assert.doesNotThrow(function () {
                cmd.run(deps);
            }, Exceptions.CommandNotImplemented);

            var cliLines = cli.getAll();

            assert.equal(cliLines.length, 19);
            for (var i in cliLines) {
                if (i < 3)
                    assert.equal(cliLines[i].type, "header");
                else if (i == cliLines.length - 1)
                    assert.equal(cliLines[i].type, "end");
                else
                    assert.equal(cliLines[i].type == "ok" || cliLines[i].type == "separator", true);
            }

            assert.equal(cliLines[3].message, "Name:\t\ttest-deps");
            assert.equal(cliLines[4].message, "Version:\t\t1.1.1");
        });
    });
});

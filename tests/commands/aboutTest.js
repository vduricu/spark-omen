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

var Command   = require('../../engine/commands/about'),
    CliMockup = require('../../engine/utils/cliMockup');

var cli    = new CliMockup(),
    simple = "./test/packages/simple.json",
    deps   = "./test/packages/deps.json",
    noDeps = "./test/packages/noDeps.json",
    cmd;

module.exports = {
    setUp: function (callback) {
        cmd = new Command();

        callback();
    },
    testSimpleRun: function (test) {
        cli.clearAll();
        cmd.init(cli, simple);

        test.equal(cmd.cli(), cli);
        test.equal(cmd.filename(), simple);

        test.doesNotThrow(function () {
            cmd.run(simple);
        }, "Command not implemented");

        var cliLines = cli.getAll();

        test.equal(cliLines.length, 10);
        for (var i in cliLines) {
            test.equal(cliLines[i].type, "ok");
        }

        test.equal(cliLines[3].message, "Name:\t\ttest/simple");
        test.equal(cliLines[4].message, "Version:\t\t0.1.2");

        test.done();
    },
    testNoDepsRun: function (test) {
        cli.clearAll();
        cmd.init(cli, noDeps);

        test.equal(cmd.cli(), cli);
        test.equal(cmd.filename(), noDeps);

        test.doesNotThrow(function () {
            cmd.run(noDeps);
        }, "Command not implemented");

        var cliLines = cli.getAll();

        test.equal(cliLines.length, 16);
        for (var i in cliLines) {
            test.equal(cliLines[i].type, "ok");
        }

        test.equal(cliLines[3].message, "Name:\t\ttest/noDeps");
        test.equal(cliLines[4].message, "Version:\t\t0.1.1");

        test.done();
    },
    testDepsRun: function (test) {
        cli.clearAll();
        cmd.init(cli, deps);

        test.equal(cmd.cli(), cli);
        test.equal(cmd.filename(), deps);

        test.doesNotThrow(function () {
            cmd.run(deps);
        }, "Command not implemented");

        var cliLines = cli.getAll();

        test.equal(cliLines.length, 19);
        for (var i in cliLines) {
            test.equal(cliLines[i].type, "ok");
        }

        test.equal(cliLines[3].message, "Name:\t\ttest/deps");
        test.equal(cliLines[4].message, "Version:\t\t1.1.1");

        test.done();
    }
};
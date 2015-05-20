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

var Command   = require('../../engine/commands/version'),
    CliMockup = require('../../engine/utils/cliMockup');

var cli      = new CliMockup(),
    filename = "../packages/simple.json",
    cmd;

module.exports = {
    setUp: function (callback) {
        cmd = new Command();
        cmd.init(cli, filename);

        callback();
    },
    testRun: function (test) {
        test.expect(4);

        test.equal(cmd.cli(), cli);
        test.equal(cmd.filename(), "../packages/simple.json");
        test.doesNotThrow(function () {
            cmd.run();
        }, "Command not implemented");

        test.equal(cli.getAll().length, 6);

        test.done();
    }
};
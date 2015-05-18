/**
 * Command class unit testing
 *
 * @package test/base
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 18.05.2015
 * @module test/base/commandTest
 */
/*jslint node: true */
"use strict";

var Command   = require('../../engine/base/command'),
    CliMockup = require('../../engine/utils/cliMockup');

module.exports = {
    testEmpty: function (test) {
        test.expect(3);

        var cmd = new Command();

        test.equal(cmd.cli(), null);
        test.equal(cmd.filename(), "project.json");
        test.throws(cmd.run, "Command not implemented");

        test.done();
    },
    testEmptyInit: function (test) {
        test.expect(3);

        var cmd = new Command();
        cmd.init(null, "");

        test.equal(cmd.cli(), null);
        test.equal(cmd.filename(), "project.json");
        test.throws(cmd.run, "Command not implemented");

        test.done();
    },
    testInit: function (test) {
        test.expect(5);

        var cmd = new Command();
        var cli = new CliMockup();
        cmd.init(cli, "../packages/simple.json");

        test.notEqual(cmd.cli(), null);
        test.equal(cmd.cli(), cli);
        test.notEqual(cmd.filename(), "project.json");
        test.equal(cmd.filename(), "../packages/simple.json");
        test.throws(cmd.run, "Command not implemented");

        test.done();
    }
};
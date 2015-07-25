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

var assert = require("assert");

var Command = require('./../../engine/base/command'),
    uiMockup = require('./../../engine/testing/uiMockup');

describe("engine.base.command", function () {
    describe("constructor", function(){
        it("should be empty", function () {
            var cmd = new Command();

            assert.equal(cmd.cli, null);
            assert.equal(cmd.filename, null);
            assert.equal(cmd.commandName, "");
            assert.throws(cmd.run, "Command not implemented");

        });
    });
    describe("init", function(){
        it("should be empty", function () {
            var cmd = new Command();
            cmd.init(null, "");

            assert.equal(cmd.cli, null);
            assert.equal(cmd.filename, null);
            assert.equal(cmd.commandName, "");
            assert.throws(cmd.run, "Command not implemented");
        });
        it("should be initialised", function () {
            var cmd = new Command("cmd");
            var cli = new uiMockup();
            cmd.init(cli, "../packages/simple.json");

            assert.notEqual(cmd.cli, null);
            assert.equal(cmd.cli, cli);
            assert.notEqual(cmd.filename, "project.json");
            assert.equal(cmd.filename, "../packages/simple.json");
            assert.equal(cmd.commandName, "cmd");
            assert.throws(cmd.run, "Command not implemented");
        });
    });
});
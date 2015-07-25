/**
 * CLI Listener unit testing
 *
 * @package tests/ui
 * @author valentin.duricu
 * @date 25.07.2015
 * @module ui
 */
/*jslint node: true */
"use strict";

var assert = require("assert");

var Spark = require("./../../engine/base/spark"),
    UIListener = require("./../../engine/ui/uiListener");

var listener;

describe("engine.ui.uiListener", function () {

    beforeEach(function () {
        listener = new UIListener();
    });

    it("header testing", function () {
        listener.on("header", function (message) {
            var data = message.split("\n");
            assert.equal(data[1].trim(), "Omen (" + Spark.version() + ") - Testing data:");
            assert.equal(data[0].trim().startsWith("=") && data[0].trim().endsWith("="), true);
            assert.equal(data[2].trim().startsWith("-") && data[2].trim().endsWith("-"), true);

            listener.removeAllListeners("header");
        });

        listener.header("Testing data");
    });

    it("end testing", function () {
        listener.on("end", function (message) {
            assert.equal(message.trim().startsWith("=") && message.trim().endsWith("="), true);

            listener.removeAllListeners("end");
        });

        listener.end();
    });

    it("separator testing", function () {
        listener.on("separator", function (message) {
            assert.equal(message.trim().startsWith("-") && message.trim().endsWith("-"), true);

            listener.removeAllListeners("separator");
        });

        listener.separator();
    });

    it("ok message testing", function () {
        listener.on("ok", function (message) {
            assert.equal(message, "Testing data");

            listener.removeAllListeners();
        });

        listener.on("error", function (message) {
            assert.equal(true, false);
        });

        listener.on("info", function (message) {
            assert.equal(true, false);
        });

        listener.on("debug", function (message) {
            assert.equal(true, false);
        });

        listener.on("fatal", function (message) {
            assert.equal(true, false);
        });

        listener.ok("Testing data");
    });

    it("error message testing", function () {
        listener.on("error", function (message) {
            assert.equal(message, "Testing data");

            listener.removeAllListeners();
        });

        listener.on("ok", function (message) {
            assert.equal(true, false);
        });

        listener.on("info", function (message) {
            assert.equal(true, false);
        });

        listener.on("debug", function (message) {
            assert.equal(true, false);
        });

        listener.on("fatal", function (message) {
            assert.equal(true, false);
        });

        listener.error("Testing data");
    });

    it("info message testing", function () {
        listener.on("info", function (message) {
            assert.equal(message, "Testing data");

            listener.removeAllListeners();
        });

        listener.on("ok", function (message) {
            assert.equal(true, false);
        });

        listener.on("error", function (message) {
            assert.equal(true, false);
        });

        listener.on("debug", function (message) {
            assert.equal(true, false);
        });

        listener.on("fatal", function (message) {
            assert.equal(true, false);
        });

        listener.info("Testing data");
    });

    it("debug message testing", function () {
        listener.on("debug", function (message) {
            assert.equal(message, "Testing data");

            listener.removeAllListeners();
        });

        listener.on("ok", function (message) {
            assert.equal(true, false);
        });

        listener.on("info", function (message) {
            assert.equal(true, false);
        });

        listener.on("error", function (message) {
            assert.equal(true, false);
        });

        listener.on("fatal", function (message) {
            assert.equal(true, false);
        });

        listener.debug("Testing data");
    });

    it("fatal message testing", function () {
        listener.on("fatal", function (message) {
            assert.equal(message, "Testing data");

            listener.removeAllListeners();
        });

        listener.on("ok", function (message) {
            assert.equal(true, false);
        });

        listener.on("info", function (message) {
            assert.equal(true, false);
        });

        listener.on("debug", function (message) {
            assert.equal(true, false);
        });

        listener.on("error", function (message) {
            assert.equal(true, false);
        });

        listener.fatal("Testing data");
    });
});
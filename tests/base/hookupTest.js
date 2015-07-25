/**
 * Testing the hookup system
 *
 * @package tests/base
 * @author valentin
 * @date 25.07.2015
 * @module base
 */
/*jslint node: true */
"use strict";

var assert = require("assert");

var HookupOmen = require('./../../engine/base/hookup');

var hookup = new HookupOmen();

describe("engine.base.hookup", function () {
    var _messages = {
        out: [],
        err: [],
        clean: function () {
            this.out = [];
            this.err = [];
        }
    };

    before(function () {
        hookup.setStdout(function (data) {
            _messages.out.push(data);
        });
        hookup.setStderr(function (data) {
            _messages.err.push(data);
        });
    });

    describe("post", function () {
        beforeEach(function () {
            _messages.clean();
            hookup.parse({
                "post-testing-cmd": [
                    "echo 2"
                ]
            });
        });

        it("size existing command", function () {
            assert.equal(hookup.sizePost("testing"), 1);
            assert.equal(hookup.size("post", "testing"), 1);

            assert.equal(_messages.out.length, 0);
            assert.equal(_messages.err.length, 0);
        });

        it("size non-existing command", function () {
            assert.equal(hookup.sizePost("ran#dom"), 0);
            assert.equal(hookup.size("post", "ran#dom"), 0);

            assert.equal(_messages.out.length, 0);
            assert.equal(_messages.err.length, 0);
        });

        it("execute existing command", function () {
            hookup.post("testing", function () {
                assert.equal(_messages.out.length, 1);
                assert.equal(_messages.err.length, 0);
            }, function () {
                assert.equal(true, false);
            });
        });

        it("execute existing + wrong command", function () {
            assert.equal(hookup.sizePost("testing"), 1);
            hookup.pushPost("testing", "ehro 3");
            assert.equal(hookup.sizePost("testing"), 2);

            hookup.post("testing", function () {
                assert.equal(true, false);
            }, function () {
                assert.equal(_messages.err.length, 1);
            });
        });

        it("execute existing + new command", function () {
            assert.equal(hookup.sizePost("testing"), 1);
            hookup.pushPost("testing", "echo 3");
            assert.equal(hookup.sizePost("testing"), 2);

            hookup.post("testing", function () {
                assert.equal(_messages.out.length, 2);
                assert.equal(_messages.err.length, 0);

                assert.equal(_messages.out[0].trim(), "2");
                assert.equal(_messages.out[1].trim(), "3");
            }, function () {
                assert.equal(true, false);
            });
        });

        it("execute non-existing command", function () {
            assert.equal(hookup.sizePost("random"), 0);

            assert.equal(hookup.post("random"), null);
        });

        it("execute non-existing command", function () {
            assert.equal(hookup.sizePost("random"), 0);
            hookup.pushPost("random", "echo 3");
            assert.equal(hookup.sizePost("random"), 1);

            hookup.post("random", function () {
                assert.equal(_messages.out.length, 1);
                assert.equal(_messages.err.length, 0);

                assert.equal(_messages.out[0].trim(), "3");
            }, function () {
                assert.equal(true, false);
            });
        });
    });

    describe("pre", function () {
        beforeEach(function () {
            _messages.clean();
            hookup.parse({
                "pre-testing-cmd": [
                    "echo 1"
                ]
            });
        });

        it("size existing command", function () {
            assert.equal(hookup.sizePre("testing"), 1);
            assert.equal(hookup.size("pre", "testing"), 1);

            assert.equal(_messages.out.length, 0);
            assert.equal(_messages.err.length, 0);
        });

        it("size non-existing command", function () {
            assert.equal(hookup.sizePre("ran#dom"), 0);
            assert.equal(hookup.size("pre", "ran#dom"), 0);

            assert.equal(_messages.out.length, 0);
            assert.equal(_messages.err.length, 0);
        });

        it("execute existing command", function () {
            hookup.pre("testing", function () {
                assert.equal(_messages.out.length, 1);
                assert.equal(_messages.err.length, 0);
            }, function () {
                assert.equal(true, false);
            });
        });

        it("execute existing + wrong command", function () {
            assert.equal(hookup.sizePre("testing"), 1);
            hookup.pushPre("testing", "ehro 3");
            assert.equal(hookup.sizePre("testing"), 2);

            hookup.pre("testing", function () {
                assert.equal(true, false);
            }, function () {
                assert.equal(_messages.err.length, 1);
            });
        });

        it("execute existing + new command", function () {
            assert.equal(hookup.sizePre("testing"), 1);
            hookup.pushPre("testing", "echo 3");
            assert.equal(hookup.sizePre("testing"), 2);

            hookup.pre("testing", function () {
                assert.equal(_messages.out.length, 2);
                assert.equal(_messages.err.length, 0);

                assert.equal(_messages.out[0].trim(), "1");
                assert.equal(_messages.out[1].trim(), "3");
            }, function () {
                assert.equal(true, false);
            });
        });

        it("execute non-existing command", function () {
            assert.equal(hookup.sizePre("random"), 0);

            assert.equal(hookup.pre("random"), null);
        });

        it("execute non-existing + new command", function () {
            assert.equal(hookup.sizePre("random"), 0);
            hookup.pushPre("random", "echo 3");
            assert.equal(hookup.sizePre("random"), 1);

            hookup.pre("random", function () {
                assert.equal(_messages.out.length, 1);
                assert.equal(_messages.err.length, 0);

                assert.equal(_messages.out[0].trim(), "3");
            }, function () {
                assert.equal(true, false);
            });
        });
    });
});
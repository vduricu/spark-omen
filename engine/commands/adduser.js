/**
 * Adds a new user into the repository or authenticates an existing one.
 *
 * @package engine/commands
 * @author valentin
 * @date 26.07.2015
 * @module commands
 */
/*jslint node: true */
"use strict";

var CommandOmen = require('./../base/command'),
    OmenAPI = require('./../utils/omenApi'),
    prompt = require('prompt');
var AdduserOmen;

/**
 * Adds a new user into the repository or authenticates an existing one.
 *
 * @class
 */
AdduserOmen = function () {
};

/**
 * Attach the super class.
 *
 * @var CommandOmen
 */
AdduserOmen.prototype = new CommandOmen("adduser");

/**
 * Code that runs when a command is executed.
 *
 * @param {Object[]} args The arguments passed to the command
 */
AdduserOmen.prototype.run = function (args) {
    var self = this;

    var properties = [
        {
            name: 'Username',
            required: true
        },
        {
            name: 'Email',
            required: true
        },
        {
            name: 'Password',
            hidden: true,
            required: true
        }
    ];

    prompt.start();

    self.cli.header("User authentication");

    prompt.get(properties, function (err, result) {
        if (err) {
            throw new Error(err);
        }

        var data = {
            username: result.Username,
            email: result.Email,
            password: result.Password
        };

        OmenAPI.doLogin(data).then(function (result) {
            self.cli.ok("User authorized succesfully.");
            self.cli.end();
        }, function (err) {
            self.cli.error(err.body.message);
        });

    });
};


module.exports = AdduserOmen;
/**
 * Listener for the CLI.
 *
 * @package engine/ui
 * @author valentin.duricu
 * @date 20.07.2015
 * @module ui
 */
/*jslint node: true */
"use strict";

var uiListener = require('./uiListener');

var CliListenerOmen;

/**
 * Listener for the CLI
 *
 * @param {Object} cli The reference to the CLI object.
 * @class
 * @return CliListenerOmen
 */
CliListenerOmen = function(cli){
    var self = this,
        _cli = cli;

    /**
     * Returns the usage of the omen command
     *
     * @return String
     */
    self.getUsage = _cli.getUsage;

    /**
     * Listener for the header event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('header', function(message){
        _cli.ok(message);
    });

    /**
     * Listener for the end event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('end', function(message){
        _cli.ok(message);
    });

    /**
     * Listener for the separator event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('separator', function(message){
        _cli.ok(message);
    });

    /**
     * Listener for the ok event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('ok', function(message){
        _cli.ok(message);
    });

    /**
     * Listener for the error event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('error', function(message){
        _cli.error(message);
    });

    /**
     * Listener for the info event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('info', function(message){
        _cli.info(message);
    });

    /**
     * Listener for the debug event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('debug', function(message){
        _cli.debug(message);
    });

    /**
     * Listener for the fatal event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('fatal', function(message){
        _cli.fatal(message);
    });

    return this;
};

CliListenerOmen.prototype = new uiListener();

module.exports = CliListenerOmen;
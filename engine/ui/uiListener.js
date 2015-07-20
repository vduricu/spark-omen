/**
 * Generic event emitter/listener for UI.
 *
 * @package engine/ui
 * @author valentin.duricu
 * @date 20.07.2015
 * @module ui
 */
/*jslint node: true */
"use strict";

var events = require("events"),
    Spark = require('./../base/spark');

var UiListenerOmen;

/**
 * Generic event emitter/listener for UI.
 *
 * @class
 * @return UiListenerOmen
 */
UiListenerOmen = function () {
    var self = this;

    /**
     * Prints the header of the command.
     *
     * @param {String} commandTitle The title of the command
     * @emit header
     */
    self.header = function (commandTitle) {
        var hdr = '====================================================\n' +
            '        Omen (' + Spark.version() + ') - ' + commandTitle + ':\n' +
            '    ----------------------------------------------------';

        this.emit('header', hdr);
    };

    /**
     * Prints the end of the command.
     *
     * @emit end
     */
    self.end = function(){
        this.emit('end', '====================================================');
    };

    /**
     * Prints a separator.
     *
     * @emit separator
     */
    self.end = function(){
        this.emit('separator', '----------------------------------------------------');
    };

    /**
     * Prints an OK message to the screen.
     *
     * @param {String} message The message to be printed
     * @emit ok
     */
    self.ok = function (message) {
        this.emit("ok", message);
    };

    /**
     * Prints a DEBUG message to the screen.
     *
     * @param {String} message The message to be printed
     * @emit debug
     */
    self.debug = function (message) {
        this.emit("debug", message);
    };

    /**
     * Prints an ERROR message to the screen.
     *
     * @param {String} message The message to be printed
     * @emit error
     */
    self.error = function (message) {
        this.emit("error", message);
    };

    /**
     * Prints a FATAL message to the screen.
     *
     * @param {String} message The message to be printed
     * @emit fatal
     */
    self.fatal = function (message) {
        this.emit("fatal", message);
    };

    /**
     * Prints an INFO message to the screen.
     *
     * @param {String} message The message to be printed
     * @emit info
     */
    self.info = function (message) {
        this.emit("info", message);
    };

    /**
     * The main block of the class.
     */
    var mainBlock = function () {
        events.EventEmitter.call(self);
    };

    mainBlock();

    return this;
};

UiListenerOmen.prototype = events.EventEmitter.prototype;

module.exports = UiListenerOmen;
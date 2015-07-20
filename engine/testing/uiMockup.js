/**
 * Listener for the testing framework.
 *
 * @package engine/ui
 * @author valentin.duricu
 * @date 20.07.2015
 * @module ui
 */
/*jslint node: true */
"use strict";

var uiListener = require('./../ui/uiListener');

var UiMockupOmen;

/**
 * Listener for the testing framework
 *
 * @class
 * @return UiMockupOmen
 */
UiMockupOmen = function(){
    var self = this,
        _contents = [];

    var _messages = function(type, message){
        _contents.push({type: type, message: message});
    };

    /**
     * Listener for the header event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('header', function(message){
        var lines = message.split('\n');
        for(var iLine in lines) {
            _messages("header", lines[iLine]);
        }
    });

    /**
     * Listener for the end event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('end', function(message){
        _messages("end", message);
    });

    /**
     * Listener for the separator event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('separator', function(message){
        _messages("separator", message);
    });

    /**
     * Listener for the ok event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('ok', function(message){
        _messages("ok", message);
    });

    /**
     * Listener for the error event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('error', function(message){
        _messages("error", message);
    });

    /**
     * Listener for the info event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('info', function(message){
        _messages("info", message);
    });

    /**
     * Listener for the debug event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('debug', function(message){
        _messages("debug", message);
    });

    /**
     * Listener for the fatal event.
     *
     * @param {String} message The message to be displayed.
     */
    self.on('fatal', function(message){
        _messages("fatal", message);
    });

    /**
     * Returns the messages stack.
     *
     * @return Object[]
     */
    self.getAll = function () {
        return _contents;
    };

    /**
     * Clears the message stack.
     */
    self.clearAll = function () {
        _contents = [];
    };

    return this;
};

UiMockupOmen.prototype = new uiListener();

module.exports = UiMockupOmen;
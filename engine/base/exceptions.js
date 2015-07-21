/**
 * A list with all the exceptions used internally.
 *
 * @package engine/base
 * @author valentin.duricu
 * @date 21.07.2015
 * @module base
 */
/*jslint node: true */
"use strict";

var Exceptions = {};

Exceptions.EmptyValue = function (field) {
    this.name = "EmptyValue";
    this.message = "You cannot leave field (" + field + ") empty!";
    this.stack = (new Error()).stack;
};

Exceptions.InvalidValue = function (field, value, example) {
    this.name = "InvalidValue";
    this.message = "The value (" + value + ") given for the field (" + field + ") isn't valid!";
    this.stack = (new Error()).stack;

    if (Object.isValid(example))
        this.message = this.message + " Example: " + example;
};

Exceptions.InvalidDependencyVersion = function (dependency, version) {
    this.name = "InvalidDependencyVersion";
    this.message = "The dependency version: '" + version + "' for '" + dependency + "' is not valid! (example: >3.0.*)";
    this.stack = (new Error()).stack;
};

Exceptions.DuplicateValue = function (value, field1, field2) {
    this.name = "DuplicateValue";
    this.message = "The value: '" + value + "' is already defined!";
    this.stack = (new Error()).stack;

    if (Object.isValid(field1) && Object.isValid(field2))
        this.message = "The field '" + field1 + "' and field '" + field2 + "' have the same value: '" + value + "'!";

};

Exceptions.CommandNotImplemented = function () {
    this.name = "CommandNotImplemented";
    this.message = "Command not implemented!";
    this.stack = (new Error()).stack;
};

Exceptions.ProjectAlreadyExists = function (message) {
    this.name = "ProjectAlreadyExists";
    this.message = ("Project already exists! " + message).trim();
    this.stack = (new Error()).stack;
};

Exceptions.FileNotFound = function (filename) {
    this.name = "FileNotFound";
    this.message = "File " + filename + " not found!";
    this.stack = (new Error()).stack;
};


for (var i in Exceptions) {
    Exceptions[i].prototype = new Error();
}

module.exports = Exceptions;
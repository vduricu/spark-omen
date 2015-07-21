/**
 * Various filesystem utilities.
 *
 * @package engine/utils
 * @author valentin.duricu
 * @date 21.07.2015
 * @module utils
 */
/*jslint node: true */
"use strict";

var fs = require('fs'),
    path = require('path');

var fsOmen;

/**
 * Various filesystem utilities.
 *
 * @class
 * @return fsOmen
 */
fsOmen = function(){
    var self = this;

    /**
     * Lists the subfolder structure of the given folder.
     *
     * @param {String} filename The path to the folder.
     * @return {Object}
     */
    self.folderLister = function (filename) {
        if(!fs.existsSync(filename))
            return [];

        var stats = fs.lstatSync(filename), info = {}, content = [];

        info = {
            file: path.basename(filename)
        };

        if (stats.isDirectory()) {
            content = fs.readdirSync(filename).map(function (child) {
                return self.folderLister(filename + '/' + child);
            });

            info.type = "directory";
            info.content = content;

        } else {
            // Assuming it's a file. In real life it could be a symlink or
            // something else!
            info.type = "file";
        }

        return info;
    };

    /**
     * Wrapper method for path.resolve
     *
     * @param {String} file The path to be resolved.
     * @return String
     */
    self.resolve = function(file){
        return path.resolve(file);
    };

    return self;
};

module.exports = new fsOmen();
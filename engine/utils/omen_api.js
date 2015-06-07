/**
 * Omen API calls.
 *
 * @package engine\utils
 * @author Valentin Duricu (valentin@duricu.ro)
 * @date 20.04.2015
 * @module utils/omen_api
 */
/*jslint node: true */
"use strict";

var path = require('path'),
    fs = require('fs');

/**
 * API Calls Class
 *
 * @class
 */
var OmenAPI = {};

/**
 * Builds the URL for the used repository.
 *
 * @param {String} url The path relative to the API route.
 * @return String
 */
OmenAPI.buildURL = function (url) {
    return GLOBAL.OMEN_ENV.url + ("/api/v1/" + url).replace("\/\/", "/");
};

/**
 * Lists the subfolder structure of the given folder.
 *
 * @param {String} filename The path to the folder.
 * @return {Object}
 */
OmenAPI.folderLister = function (filename) {
    var stats = fs.lstatSync(filename), info = {}, content = [];

    info = {
        file: path.basename(filename)
    };

    if (stats.isDirectory()) {
        content = fs.readdirSync(filename).map(function (child) {
            return OmenAPI.folderLister(filename + '/' + child);
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
 * Returns the propath to be used by the current defined application.
 *
 * @param {Project} lock The lock file reference.
 * @return {String}
 */
OmenAPI.propath = function (lock) {
    var propath = '',
        sourceFolder = ["src", "source"],
        vendors = OmenAPI.folderLister('./vendors/');

    propath += path.resolve('.') + ";";

    for(var i in vendors.content){
        var omenPackage = vendors.content[i];
        var folder = omenPackage.file;

        if(omenPackage.type !== "directory")
            continue;

        for(var j in omenPackage.content){
            if (omenPackage.content[j].type == "directory" &&
                sourceFolder.indexOf(omenPackage.content[j].file) >= 0)
                folder += "/src";
        }

        folder = path.resolve('./vendors/' + folder);
        propath += folder + ";";
    }

    propath += ';';
    return propath.replace(/;;/gi,';');
};

module.exports = OmenAPI;
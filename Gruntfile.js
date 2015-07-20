/*jslint node: true */
"use strict";

require('./engine/utils/general');

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'engine/**/*.js', 'tests/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    GeneralOmen: true
                }
            }
        },
        nodeunit: {
            all: ['tests/**/*Test.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    /* To move to Mocha */
    //grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['jshint']);

};
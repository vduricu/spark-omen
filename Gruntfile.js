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
                    GeneralOmen: true,
                    /* MOCHA */
                    "describe": true,
                    "it": true,
                    "before": true,
                    "beforeEach": true,
                    "after": true,
                    "afterEach": true
                }
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: [
                    './engine/utils/general'
                ]
            },
            src: ['tests/**/*Test.js']
        },
        mocha_istanbul: {
            coverage: {
                options:{
                    mochaOptions: ['--harmony'], // any extra options
                    istanbulOptions: ['--harmony'],
                    require: [
                        './engine/utils/general'
                    ]
                },
                src: ['tests/*/*Test.js'] // a folder works nicely
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('coverage', ['mocha_istanbul']);

    grunt.registerTask('default', ['jshint', 'mochaTest', 'mocha_istanbul']);

};
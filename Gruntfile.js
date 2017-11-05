module.exports = function(grunt){
	"use strict";
	
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            build: {
                files: {
                    'scss/build/sass/ionic.css': 'scss/ionic.scss',
                    'scss/build/sass/style.css': 'scss/style.scss'
                }
            }
        },
        concat: {
            css: {
                src: [
                    'scss/build/sass/*'
                ],
                dest: 'scss/build/packedStyle.css'
            },
        	jsEngine: {
                src: [
                    'js-lib/js/*'
                ],
                dest: 'js-lib/build/packedEngine.js'
            },
            jsPlugin: {
                src: [
                    'js-lib/lib/plugins-minified/*/*.js'
                ],
                dest: 'www/js/packedPlugins.js'
            }
        },
        cssmin: {
		    options: {
		        keepSpecialComments: 0
		    },
            css: {
                src: 'scss/build/packedStyle.css',
                dest: 'www/css/packedStyle.min.css'
            }
        },
        uglify: {
            jsEngine: {
                files: {
                    'www/js/packedEngine.min.js': ['js-lib/build/packedEngine.js']
                }
            }
        },
		watch: {
			jsEngine: {
				files: ['js-lib/js/*'],
				tasks: ['enginejs']
			},
            jsPlugin: {
                files: ['js-lib/lib/plugins-minified/*/*.js', 'js-lib/lib/plugins-minified/*'],
                tasks: ['engineplg']
            },
            css: {
                files: ['scss/*.scss','scss/ionicons/*.scss'],
                tasks: ['buildcss']
            }
		}
    });

    grunt.registerTask('enginejs', ['concat:jsEngine', 'uglify:jsEngine']);
    grunt.registerTask('engineplg', ['concat:jsPlugin']);
    grunt.registerTask('buildcss',  ['sass', 'concat:css', 'cssmin']);

};
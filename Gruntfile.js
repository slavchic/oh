module.exports = function (grunt) {


	grunt.initConfig({
		concat: {
			options: { // define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {

				src: [ // the files to concatenate

					// jquery and extensions
					'vendor/jquery/jquery-1.11.3.min.js',
					'js/plugins/moment/moment.min.js',

					//bootstrap
					'vendor/bootstrap-3.3.6/js/affix.js',
					'vendor/bootstrap-3.3.6/js/alert.js',
					'vendor/bootstrap-3.3.6/js/button.js',
					'vendor/bootstrap-3.3.6/js/carousel.js',
					'vendor/bootstrap-3.3.6/js/collapse.js',
					'vendor/bootstrap-3.3.6/js/dropdown.js',
					'vendor/bootstrap-3.3.6/js/modal.js',
					//'vendor/bootstrap-3.3.6/js/popover.js',
					//'vendor/bootstrap-3.3.6/js/scrollspy.js',
					'vendor/bootstrap-3.3.6/js/tab.js',
					'vendor/bootstrap-3.3.6/js/tooltip.js',
					'vendor/bootstrap-3.3.6/js/transition.js',

					'vendor/select2-3.5.4/select2.min.js'


				],
				// the location of the resulting JS file
				dest: 'js/main.js'
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'js/main.min.js': ['js/main.js']
				}
			}
		},
		less: {
			compileMain: {
				options: {
					//compress:true,
					strictMath: false
				},
				src: 'less/main.less',
				dest: 'css/main.css'
			}
		},
		cssmin: {
			target: {
				files: {
					'css/main.min.css': ['css/main.css']
				}
			}
		},
		watch: {
			files: [
				'less/*.less',
				'less/**/*.less'
			],
			tasks: ['Compile main.less']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');


	grunt.registerTask('Compile main.js', ['concat', 'uglify'])
	grunt.registerTask('Compile main.less', ['less:compileMain', 'cssmin']);

}
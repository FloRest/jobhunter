var cssFiles = [
	"app/bower_components/html5-boilerplate/css/normalize.css",
	"app/bower_components/html5-boilerplate/css/main.css",
	"app/bower_components/angular-material/themes/light-green-theme.css",
	"app/bower_components/angular-material/themes/blue-theme.css",
	"app/bower_components/bootstrap-css-only/css/bootstrap.min.css",
	"app/app.css",
	"app/patch.css"
];


var libs = [
	"app/bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js",
	"app/bower_components/underscore/underscore-min.js",
	"app/bower_components/angular/angular.js",
	"app/bower_components/angular-aria/angular-aria.js",
	"app/bower_components/angular-animate/angular-animate.js",
	"app/bower_components/hammerjs/hammer.js",
	"app/bower_components/angular-material/angular-material.js",
	"app/bower_components/angular-route/angular-route.js",
	"app/bower_components/angular-resource/angular-resource.js",
	"app/bower_components/angular-bootstrap/ui-bootstrap.min.js",
	"app/bower_components/ngFx/dist/ngFx.js"
];
var jsFiles = [
	"app/components/authentication/authentication.js",
	"app/components/apiRest/api.js",
	"app/components/apiRest/offers/offers.js",
	"app/components/apiRest/resumes/resumes.js",
	"app/components/apiRest/search/search.js",
	"app/components/angular-toggle-switch/angular-toggle-switch.min.js",
	"app/components/toast/toast.js",
	"app/app.js",
	"app/views.js",
	"app/views/search/search.js",
	"app/views/resumes/resumes.js",
	"app/views/resumes/resume.js",
	"app/views/offers/offers.js",
	"app/views/offers/offer.js"
];

var grunt_config = {
	cssmin: {
	  minify: {
	  	keepSpecialComments: false,
	    src: cssFiles,
	    dest: "app/dist/app.min.css"
	  }
	},
    concat: {
	    options: {
	      separator: ';\n',
	      stripBanners: true
	    },
	    app: {
	      src: jsFiles,
	      dest: 'app/dist/app.js',
	    },
	    libs: {
	      src: libs,
	      dest: 'app/dist/libs.js',
	    }
	},
	uglify: {
		all: {
			files: [{
		    	mangle: true,
				preserveComments: false,
		        src: 'app/dist/libs.js',
		        dest: 'app/dist/libs.min.js'
		    }]
		}
	}
};
module.exports = function (grunt) {

	grunt.initConfig(grunt_config);
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-uncss');

	grunt.registerTask('build', ['cssmin:minify', 'concat:libs', 'concat:app', 'uglify:all']);
	grunt.registerTask('default', ['build']);
};
/*!
 * UnderTasker
 * Copyright 2014 Tyler Rilling, some parts loosely based off of Bootstrap
 * Licensed under MIT (https://github.com/underlost/Undertasker/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * underlost.net v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'UnderTasker\\\'s JavaScript requires jQuery\') }\n\n',

    // Task configuration.
    clean: {
      dist: ['dist']
    },

    coffee: {
        compile: {
            files: {
                // 'source/js/app.js': 'source/coffee/source.coffee', // 1:1 compile
                'source/js/app.js': ['source/coffee/*.coffee'] // compile and concat into single file
            }
        },
    },

    jshint: {
      options: {
        jshintrc: 'source/js/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: ['Gruntfile.js', 'grunt/*.js']
      },
      src: {
        src: 'source/js/*.js'
      },
      test: {
        src: 'source/js/tests/unit/*.js'
      }
    },

    jscs: {
      options: {
        config: 'source/js/.jscsrc'
      },
      grunt: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null,
          requireParenthesesAroundIIFE: true
        },
        src: '<%= jshint.grunt.src %>'
      },
      src: {
        src: '<%= jshint.src.src %>'
      },
      test: {
        src: '<%= jshint.test.src %>'
      },
      assets: {
        src: '<%= jshint.assets.src %>'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>',
        stripBanners: false
      },
      undertask: {
        src: [
          'source/js/lib/particles.js',
          // 'source/js/lib/jquery.lettering-0.6.1.min.js',
          // 'source/js/lib/jquery.history.min.js',
          'source/js/handler.js'
        ],
        dest: 'dist/js/<%= pkg.slug %>.js'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      undertask: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= concat.undertask.dest %>',
        dest: 'dist/js/<%= pkg.slug %>.min.js'
      }
    },

    qunit: {
      options: {
        inject: 'source/js/tests/unit/phantom.js'
      },
      files: 'source/js/tests/index.html'
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.slug %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.slug %>.css.map'
        },
        files: {
          'dist/css/<%= pkg.slug %>.css': 'source/less/<%= pkg.slug %>.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/<%= pkg.slug %>.min.css': 'dist/css/<%= pkg.slug %>.css'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.slug %>.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'source/less/.csslintrc'
      },
      src: [
        'dist/css/<%= pkg.slug %>.css'
      ]
    },

    cssmin: {
      options: {
        keepSpecialComments: '*',
        noAdvanced: true,
        report: 'min',
        compatibility: 'ie8'
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: 'dist/css/*.css'
      }
    },

    csscomb: {
      options: {
        config: 'source/less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
        expand: true,
        cwd: 'source/img/',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'dist/img/'
      }]
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: './source',
        src: [
          'fonts/*'
        ],
        dest: 'dist'
      },
      dist: {
        expand: true,
        cwd: './dist',
        src: [
          '{css,js}/*.min.*',
          'css/*.map',
          'fonts/*',
          'img/*',
          'img/work/*',
          'img/rings/*',
          'img/photo/*',
        ],
        dest: 'source/site/dist'
      },
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    jekyll: {
      options : {
        bundleExec: true,
        src : 'source/site',
      },
      site: {}
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: '_site/**/*.html'
      }
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      less: {
        files: 'source/less/*.less',
        tasks: 'less'
      }
    },

    git_deploy: {
      github: {
        options: {
          url: 'git@github.com:underlost/underlost.github.io.git',
          branch: 'gh-pages',
          message: 'Deployed with grunt' // Commit message
        },
        src: '_site'
      },
    }

  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'dependencies'});
  require('time-grunt')(grunt);

  // JS distribution task.
  grunt.registerTask('build-js', ['concat', 'uglify']);

  // IMG distribution task.
  grunt.registerTask('build-img', ['imagemin']);

  // CSS build task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('build-css', ['less-compile', 'autoprefixer', 'usebanner', 'csscomb', 'less:minify', 'cssmin']);

  // HTML build/validation site task
  grunt.registerTask('build-site', ['jekyll', 'validation']);

  // Git Deploy task
  grunt.registerTask('git-deploy', ['git_deploy:github']);

  // Test task.
  grunt.registerTask('test', ['build-css', 'csslint', 'jshint', 'jscs', 'qunit']);

  // Build static assets and HTML
  grunt.registerTask('build', ['clean', 'build-css', 'build-js', 'build-img', 'build-site', 'copy:fonts' /* 'copy:dist' */ ]);

  // Only build static assets, not html
  grunt.registerTask('dist', ['clean', 'build-css', 'build-js', 'build-img', 'copy:fonts' /* 'copy:dist' */]);

  // Full Deploy
  grunt.registerTask('deploy', ['git-deploy']);

};

/*!
 * Underlost.net's Gruntfile
 * http://underlost.net
 * Copyright 2014 Tyler Rilling
 * Licensed under MIT (https://github.com/underlost/underlost.net/blob/master/LICENSE)
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
  var updateShrinkwrap = require('./grunt/shrinkwrap.js');

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * underlost.codes v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'underlost\\\'s JavaScript requires jQuery\') }\n\n',

    // Task configuration.
    clean: {
      dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: '_assets/js/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: ['Gruntfile.js', 'grunt/*.js']
      },
      src: {
        src: '_assets/js/*.js'
      },
      test: {
        src: '_assets/js/tests/unit/*.js'
      }
    },

    jscs: {
      options: {
        config: '_assets/js/.jscsrc'
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
      underlost: {
        src: [
          '_assets/js/lib/raphael-2.0.1.js',
          '_assets/js/lib/abstract-0.1.js',
          '_assets/js/handler.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      underlost: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= concat.underlost.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    qunit: {
      options: {
        inject: '_assets/js/tests/unit/phantom.js'
      },
      files: '_assets/js/tests/index.html'
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': '_assets/less/underlost.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css',
          'dist/css/<%= pkg.name %>-theme.min.css': 'dist/css/<%= pkg.name %>-theme.css'
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
        src: 'dist/css/<%= pkg.name %>.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      src: [
        'dist/css/underlost.css',
        'dist/css/underlost-theme.css'
      ]
    },

    cssmin: {
      options: {
        keepSpecialComments: '*',
        noAdvanced: true, // turn advanced optimizations off until the issue is fixed in clean-css
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
        config: '_assets/less/.csscomb.json'
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
        cwd: '_assets/img/',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'dist/img/'
      }]
      }
    },

    copy: {
      fonts: {
        expand: true,
        cwd: './_assets',
        src: [
          'fonts/*'
        ],
        dest: 'dist'
      }
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
      source: {}
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
        files: '_assets/less/*.less',
        tasks: 'less'
      }
    },

    git_deploy: {
      github: {
        options: {
          url: 'git@github.com:underlost/underlost.github.io.git',
          branch: 'gh-pages',
          message: 'Deployed from gruntfile.js'
        },
        src: '_site'
      },
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      },
      npmShrinkWrap: {
        command: 'npm shrinkwrap --dev'
      }
    }
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  require('time-grunt')(grunt);

  // HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // Git Deploy task
  grunt.registerTask('dist-deploy', ['git_deploy:github']);

  // Test task.
  var testSubtasks = [];
  // Skip core tests if running a different subset of the test suite
  if (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'core') {
    testSubtasks = testSubtasks.concat(['dist-css', 'csslint', 'jshint', 'jscs', 'qunit']);
  }
  // Skip HTML validation if running a different subset of the test suite
  if (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'validate-html') {
    testSubtasks.push('validate-html');
  }
  grunt.registerTask('test', testSubtasks);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // IMG distribution task.
  grunt.registerTask('dist-img', ['imagemin']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer', 'usebanner', 'csscomb', 'less:minify', 'cssmin']);


  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'dist-img', 'copy:fonts']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist', 'update-shrinkwrap']);

  // Full Deploy
  grunt.registerTask('deploy', ['validate-html', 'dist', 'dist-deploy']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', 'sed');

  // Task for updating the npm packages used by the Travis build.
  grunt.registerTask('update-shrinkwrap', ['exec:npmUpdate', 'exec:npmShrinkWrap', '_update-shrinkwrap']);
  grunt.registerTask('_update-shrinkwrap', function () { updateShrinkwrap.call(this, grunt); });
};

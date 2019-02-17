/*!
 * Based on UnderTasker
 * Copyright 2019 Tyler Rilling
 * Licensed under MIT (https://github.com/underlost/Undertasker/blob/master/LICENSE)
 */

gulp = require('gulp');
child = require('child_process');
jshint = require('gulp-jshint');
sass = require('gulp-sass'); sass.compiler = require('node-sass');
sourcemaps = require('gulp-sourcemaps');
concat = require('gulp-concat');
autoprefixer = require('gulp-autoprefixer');
cleanCSS = require('gulp-clean-css');
rename = require('gulp-rename'); // to rename any file
uglify = require('gulp-uglify-es').default;
del = require('del');
stylish = require('jshint-stylish');
coffee = require('gulp-coffee');
gutil = require('gulp-util');
imagemin = require('gulp-imagemin');
ghPages = require('gulp-gh-pages');
git = require('gulp-deploy-git');
browserSync = require('browser-sync');
awspublish = require("gulp-awspublish");
fs = require('fs');
concurrent = require("concurrent-transform");

// Cleans the web dist folder
gulp.task('clean', function () {
  return del([
    'source/site/dist/**/*',
    '.publish'
  ]);
});

gulp.task('browserSync', function (done) {
  browserSync.init({
    server: { baseDir: ".publish/" },
    port: 9005
  });
  done();
});
gulp.task('browserSyncReload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('copy-assets', function() {
  return gulp.src('source/site/dist/**/*')
  .pipe(gulp.dest('.publish/dist'));
});

// Copy fonts
gulp.task('copy-fonts', function() {
  return gulp.src([
    'source/fonts/**/*.{ttf,woff,eof,svg,eot,woff2,otf}',
    'node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,eof,svg,eot,woff2,otf}'
  ])
  .pipe(gulp.dest('source/site/dist/fonts'));
});

// Minify Images
gulp.task('imagemin', function() {
  return gulp.src('source/img/**/*.{jpg,png,gif,ico}')
	.pipe(imagemin())
  .pipe(gulp.dest('source/site/dist/img'))
  .pipe(browserSync.stream());
});

// Copy Components
gulp.task('copy-font-awesome', function() {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/scss/**/*.*')
  .pipe(gulp.dest('source/sass/font-awesome'));
});
gulp.task('copy-bootstrap', function() {
  return gulp.src('node_modules/bootstrap/scss/**/*.*')
  .pipe(gulp.dest('source/sass/bootstrap'));
});
gulp.task('install', gulp.parallel('copy-font-awesome', 'copy-bootstrap', 'copy-fonts'));

// Compile coffeescript to JS
gulp.task('brew-coffee', function() {
  return gulp.src('source/coffee/*.coffee')
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('source/js/coffee/'))
});

// CSS Build Task
gulp.task('build-css', function() {
  return gulp.src('source/sass/site.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
  .pipe(gulp.dest('source/site/dist/css'))
  .pipe(cleanCSS({compatibility: 'ie9'}))
  .pipe(rename('site.min.css'))
  .pipe(gulp.dest('source/site/dist/css'))
  .on('error', sass.logError)
  .pipe(browserSync.stream());
});

// Concat All JS into unminified single file
gulp.task('concat-js', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    //'node_modules/lightbox2/dist/js/lightbox.js',
    //'node_modules/paroller.js/dist/jquery.paroller.js',
    'node_modules/pace-js/pace.js',
    //'node_modules/pjax/pjax.js',
    //'node_modules/fullpage.js/dist/jquery.fullpage.js',
    //'node_modules/@webcomponents/shadydom/shadydom.min.js',
    //'node_modules/@webcomponents/custom-elements/custom-elements.min.js',
    //'node_modules/css-doodle/css-doodle.js',
    //'source/js/abstract.js',
    //'source/js/vline.jquery.js',
    //'source/js/background.js',
    //'source/js/activeNavigation.jquery.js',
    'source/js/site.js',
    // Coffeescript
    'source/js/coffee/*.*',
  ], { allowEmpty: true })
  .pipe(sourcemaps.init())
  .pipe(concat('site.js'))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('source/site/dist/js'))
  .pipe(browserSync.stream());
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/site/js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

// Shrinks all the js
gulp.task('shrink-js', function() {
  return gulp.src('source/site/dist/js/site.js')
  .pipe(uglify())
  .pipe(rename('site.min.js'))
  .pipe(gulp.dest('source/site/dist/js'))
  .pipe(browserSync.stream())
});

// Default Javascript build task
gulp.task('build-js', gulp.series('concat-js', 'shrink-js'));

// Jekyll
gulp.task('jekyll', function() {
  return child.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watchFiles', function() {
  gulp.watch('source/coffee/**/*.js', gulp.series(['brew-coffee', 'build-js', 'copy-assets']));
  gulp.watch('source/js/**/*.js', gulp.series(['build-js', 'copy-assets']));
  gulp.watch('source/sass/**/*.scss', gulp.series(['build-css', 'copy-assets']));
  gulp.watch("source/site/**/*", gulp.series('jekyll', 'browserSyncReload'));
});

// Deploy to GitHub Pages
gulp.task('github-deploy', function () {
  var repoPath = require('path').join(require('os').tmpdir(), 'tmpRepo');
  $.util.log('Delete ' + $.util.colors.magenta(repoPath));
  del.sync(repoPath, {force: true});
  del(['./.publish/.git']); // Clear the repo before we try pushing.
  return gulp.src('./.publish/**/*')
  .pipe($.ghPages({
      remoteUrl: 'https://github.com/underlost/tyler.codes.git',
      branch: 'gh-pages'
  }));
});

//S3 Publish
gulp.task('s3', function () {
  var credentials = JSON.parse(fs.readFileSync('.awspublish-settings.json', 'utf8'));
  var publisher = awspublish.create(credentials);
  var headers = {
     'Cache-Control': 'max-age=315360000, no-transform, public'
  };
  return gulp.src('.publish/**/*.*',{cwd:'.'})
  .pipe(awspublish.gzip())
  .pipe(concurrent(publisher.publish(headers)), 10)
  .pipe(publisher.cache())
  .pipe(publisher.sync())
  .pipe(awspublish.reporter());
});

// Default build task
gulp.task('build', gulp.series('clean', gulp.parallel('imagemin', 'build-css', 'build-js', 'copy-fonts', 'jekyll') ));

// Deploy to github
gulp.task('github', gulp.series('build', 'github-deploy'));

// Watch task
gulp.task('watch', gulp.parallel('watchFiles', 'browserSync'));

// Default task will build the jekyll site, launch BrowserSync & watch files.
gulp.task('default', gulp.series(['watch']));

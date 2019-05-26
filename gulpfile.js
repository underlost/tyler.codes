/*!
 * Based on UnderTasker
 * Copyright 2019 Tyler Rilling
 * Licensed under MIT (https://github.com/underlost/Undertasker/blob/master/LICENSE)
 */

gulp = require('gulp');
rename = require('gulp-rename'); // to rename any file
del = require('del');
imagemin = require('gulp-imagemin');
ghPages = require('gulp-gh-pages');
git = require('gulp-deploy-git');
awspublish = require("gulp-awspublish");
cloudfront = require('gulp-cloudfront-invalidate-aws-publish');
fs = require('fs');
concurrent = require("concurrent-transform");

// Cleans the web dist folder
gulp.task('clean', function () {
  return del([
    '.cache',
    'public'
  ]);
});

// Minify Images
gulp.task('imagemin', function() {
  return gulp.src('src/images/**/*.{jpg,png,gif,ico}')
	.pipe(imagemin())
  .pipe(gulp.dest('src/images'));
});

// Copy bootstrap files
gulp.task('copy-bootstrap', function() {
  return gulp.src('node_modules/bootstrap/scss/**/*.*')
  .pipe(gulp.dest('src/sass/bootstrap'));
});
gulp.task('install', gulp.parallel('copy-bootstrap',));


// Deploy to GitHub Pages
gulp.task('github', function () {
  var repoPath = require('path').join(require('os').tmpdir(), 'tmpRepo');
  $.util.log('Delete ' + $.util.colors.magenta(repoPath));
  del.sync(repoPath, {force: true});
  del(['./public/.git']); // Clear the repo before we try pushing.
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
  return gulp.src('public/**/*.*',{cwd:'.'})
  .pipe(awspublish.gzip())
  .pipe(concurrent(publisher.publish(headers)), 10)
  .pipe(publisher.cache())
  .pipe(publisher.sync())
  .pipe(awspublish.reporter());
});


// Default task
gulp.task('default', gulp.series(['clean', 'imagemin']));

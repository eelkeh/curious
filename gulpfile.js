'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var responsive = require('gulp-responsive');

gulp.task('images', function () {
  return gulp.src('./static/img/*.{png,jpg}')
    .pipe(responsive({
      '*.jpg': {
        format: 'jpeg',
        width: 1920,
        quality: 75,
        rename: {suffix: '--large'}
      }
    })
      .on('error', gutil.log)
      .on('error', gutil.beep)
    )
    .pipe(gulp.dest('./static/img/variations'));
});

gulp.task('sass', function () {
  return gulp.src('./static/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./static/css/*.scss', ['sass']);
});

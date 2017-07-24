/**
 * BS4 Polymer gulpfile
 */

'use strict';

// include gulp & tools
import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import inlineSource from 'gulp-inline-source';

// Compile Stylesheets
gulp.task('sass', function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(rename({
      suffix: '.min',
      extname: '.css',
    }))
    .pipe(gulp.dest('src/'));
});

// Inline css
gulp.task('inline', ['sass'], function() {
  return gulp.src(['src/**/*.html'])
    .pipe(inlineSource())
    .pipe(gulp.dest('dist/'));
});

// Copy core css
gulp.task('copy', ['sass'], function() {
  return gulp.src(['src/bs4-core.min.css'])
    .pipe(gulp.dest('dist/'));
});

// Build task
gulp.task('build', ['sass', 'inline', 'copy']);

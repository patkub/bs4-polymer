/**
 * BS4 Polymer gulpfile
 */

'use strict';

// include gulp & tools
import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import inlineSource from 'gulp-inline-source';

/**
 * Compile stylesheets
 */
gulp.task('sass', function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 6,
    }).on('error', sass.logError))
    .pipe(cleanCSS({
      level: 2,
    }))
    // Replace :last-child selector with :last-of-type, for compatibility with
    // Polymer's template element nested inside elements.
    .pipe(replace(':last-child', ':last-of-type'))
    .pipe(rename({
      suffix: '.min',
      extname: '.css',
    }))
    .pipe(gulp.dest('src/'));
});

/**
 * Inline css
 */
gulp.task('inline', ['sass'], function() {
  return gulp.src(['src/**/*.html'])
    .pipe(inlineSource())
    .pipe(gulp.dest('dist/'));
});

/**
 * Copy core css
 */
gulp.task('copy', ['sass'], function() {
  return gulp.src(['src/bs4-core.min.css'])
    .pipe(gulp.dest('dist/'));
});

/**
 * Build task
 */
gulp.task('build', ['sass', 'inline', 'copy']);

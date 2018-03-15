'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

// COMPILE SASS
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});


// COMPILE PUG
gulp.task('pug', function buildHTML() {
  return gulp.src('./src/pug/**/*.pug')
  .pipe(pug({pretty: 1}))
  .pipe(gulp.dest('./dist'));
});

gulp.task('pug:watch', function () {
  gulp.watch('./src/pug/**/*.pug', ['pug']);
});


// MINIFY JS
gulp.task('minifyjs', function (cb) {
  pump([
        gulp.src(['./src/js/**/photoswipe.min.js','./src/js/**/photoswipe-ui-default.min.js','./src/js/**/jquery.cookiebar.js',
                 './src/js/**/jquery.easy-autocomplete.min.js','./src/js/**/swiper.min.js','./src/js/**/lazyload.min.js','./src/js/**/jquery.validate.min.js', './src/js/functions.js']),
        concat('all.min.js'),
        uglify(),
        gulp.dest('./dist/js')
    ],
    cb
  );
});

gulp.task('minifyjs:watch', function () {
  gulp.watch('./src/js/**/*.js', ['minifyjs']);
});


// SERVE
gulp.task('serve', function(){

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
	gulp.watch('./dist/css/**/*.css').on('change', browserSync.reload);
});


//DEFAULT
gulp.task('default', ['sass:watch', 'pug:watch', 'minifyjs:watch', 'serve']);


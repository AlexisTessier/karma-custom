'use strict';

var username = 'AlexisTessier';

/*----------------------------------*/

var path = require('path');

var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var batch = require('gulp-batch');
var mustache = require('gulp-mustache');
var rename = require("gulp-rename");

/*----------------------------------*/

var mustacheTarget = [
	path.join(__dirname, 'README.mustache')
];

gulp.task('mustache', function(done) {
	gulp.src(mustacheTarget)
		.pipe(plumber())
		.pipe(mustache({
			'package':require('./package'),
			'username': username
		}))
		.pipe(rename(function (path) {
		    path.basename = path.basename.replace('.md', '');
		    path.extname = ".md";
		}))
		.pipe(gulp.dest('./'))
		.on('end', function() {
			done();
		});
});

/*----------------------------------*/

gulp.task('build', ['mustache']);

gulp.task('watch', ['build'], function () {
	watch(mustacheTarget, batch(function (events, done) {
		gulp.start('mustache', done);
	}));
});

gulp.task('default', ['build']);
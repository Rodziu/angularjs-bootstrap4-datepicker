/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

!function(){
	'use strict';
	const pkg = require('./package'),
		gulp = require('gulp'),
		concat = require('gulp-concat'),
		rename = require('gulp-rename'),
		sourcemaps = require('gulp-sourcemaps');

	// templates
	const minifyHTML = require('gulp-minify-html'),
		templateCache = require('gulp-angular-templatecache');

	gulp.task('templates', function(){
		return gulp.src('src/templates/**.html')
			.pipe(minifyHTML({quotes: true}))
			.pipe(templateCache('templates.js', {
				module: 'datePicker',
				root: 'src/templates'
			}))
			.pipe(gulp.dest('dist'));
	});
	// js
	const ngAnnotate = require('@rodziu/gulp-ng-annotate-patched'),
		uglify = require('gulp-uglify-es').default,
		eslint = require('gulp-eslint'),
		gap = require('gulp-append-prepend');

	gulp.task('js', gulp.series('templates', function(){
		return gulp.src([
			'src/js/**/*.module.js',
			'src/js/**/*.js'
		])
			.pipe(ngAnnotate())
			.pipe(sourcemaps.init())
			.pipe(concat(pkg.name + '.js'))
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failOnError())
			.pipe(gap.appendFile('dist/templates.js'))
			.pipe(gulp.dest('dist'))
			.pipe(rename(pkg.name + '.min.js'))
			.pipe(uglify())
			.pipe(sourcemaps.write('./', {includeContent: false}))
			.pipe(gulp.dest('dist'))
			.on('end', function(){
				require('fs').unlinkSync('dist/templates.js');
				return this;
			});
	}));

	// css
	const cssMin = require('gulp-clean-css'),
		sass = require('gulp-sass');

	gulp.task('scss', function(){
		return gulp.src('src/scss/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(gulp.dest('dist'))
			.pipe(rename({suffix: '.min'}))
			.pipe(cssMin())
			.pipe(sourcemaps.write('./', {includeContent: false}))
			.pipe(gulp.dest('dist'));
	});

	//
	exports.default = gulp.series('js', 'scss');
}();

'use strict';

var gulp = require('gulp'),
	jsonEditor = require('gulp-json-editor'),
	runSequence = require('run-sequence'),
	del = require('del'),
	fs = require('fs'),
	path = require('path'),
	ChromeExtension = require('crx'),
	packageConfig = require('./package.json');

gulp.task('clean', function (done) {
	del(['./build'], done);
});

gulp.task('chrome:build', function (done) {
	runSequence('chrome:copy-src', 'chrome:update-manifest', 'chrome:pack', done);
});

gulp.task('chrome:copy-src', function () {
	return gulp.src('./chrome/src/*')
		.pipe(gulp.dest('./build/chrome/' + packageConfig.name + '/'));
});

gulp.task('chrome:update-manifest', function () {
	return gulp.src('./chrome/src/manifest.json')
		.pipe(jsonEditor({
			version: packageConfig.version
		}))
		.pipe(gulp.dest('./build/chrome/' + packageConfig.name + '/'));
});

gulp.task('chrome:pack', function (done) {
	var crx = new ChromeExtension({
		privateKey: fs.readFileSync(
			path.join(__dirname, 'chrome', 'bin', packageConfig.name + '.pem')
		)
	});
	crx.load(path.join(__dirname, 'build', 'chrome', packageConfig.name))
		.then(function () {
			return crx.pack().then(function (crxBuffer) {
				fs.writeFile(
					path.join(__dirname, 'chrome', 'bin',
						packageConfig.name + '.crx'),
					crxBuffer
				);
				done();
			});
		});
});

gulp.task('build', function (done) {
	runSequence('clean', 'chrome:build', done);
});
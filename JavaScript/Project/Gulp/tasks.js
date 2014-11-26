var gulp = require('gulp');
var fs = require('fs');
var plugins = require('gulp-load-plugins')();

module.exports = {

	/**
	 * Generate correct path with folder and array of files
	 */
	getCorrectPaths: function (folder, files) {
		var cfiles = [];
		for (var i = 0; i < files.length; i++) {
			cfiles.push(folder + files[i]);
		}

		return cfiles;
	},

	/**
	 * Inject files
	 */
	inject: function (folder, files, index, folders, projectName) {
		return gulp.src(folder + index)
			.pipe(plugins.inject(
				gulp.src(files, { read: false }),
				{
					transform: function (filepath) {
						var isShared = filepath.indexOf(folders.shared);
						var isWindows = filepath.indexOf(folders.windows);
						var isPhone = filepath.indexOf(folders.phone);

						var cleanpath = '';
						if (projectName) {
							cleanpath = filepath.replace(projectName, '');
						} else {
							if (isShared > -1) {
								cleanpath = filepath.substr(isShared + folders.shared.length);
							}
							if (isWindows > -1) {
								cleanpath = filepath.substr(isWindows + folders.windows.length);
							}
							if (isPhone > -1) {
								cleanpath = filepath.substr(isPhone + folders.phone.length);
							}
						}

						if (filepath.indexOf('.js') > -1) {
							return '<script src="' + cleanpath + '"></script>'
						}
						return ' <link rel="stylesheet" href="' + cleanpath + '">'
					}
				}))
			.pipe(gulp.dest(folder));
	},

	/*
	 * Compile sass files from a folder to a css folder
	 */
	sass: function(folder, scss, css){
		return gulp.src(folder + scss)
			.pipe(plugins.sass())
			.pipe(gulp.dest(folder + css));
	},

	/*
	 * Clear index file
	 */
	clear: function(folder, indexBkp, index, build) {
		// if exist indexbkp replace normal index and delete this
		gulp.src(folder + indexBkp)
			.pipe(plugins.rename(index))
			.pipe(gulp.dest(folder));

		gulp.src(build, { read: false })
		   .pipe(plugins.clean({ force: true }));

		return gulp.src(folder + indexBkp)
			.pipe(plugins.clean({ force: true }));

	},

	/*
	 * Build my project
	 */
	build: function (folder, indexBkp, index, buildJS, buildCSS, build) {
		//Save index
		gulp.src(folder + index)
			.pipe(plugins.clone())
			.pipe(plugins.rename(indexBkp))
			.pipe(gulp.dest(folder));

		// Build files
		gulp.src(folder + index)
			.pipe(plugins.usemin({
				css: [plugins.minifyCss()],
				js: [plugins.uglify()]
			}))
			.pipe(gulp.dest(folder));

		gulp.src(buildJS)
			.pipe(plugins.uglify())
			.pipe(gulp.dest(build));

		return gulp.src(buildCSS)
			.pipe(plugins.minifyCss())
			.pipe(gulp.dest(build));
	},

	/*
	 * Experimental: Get current project name
	 */
	getProjectName: function () {
        return fs.readdirSync('..').filter(function (file) {
			return file.indexOf('.') < 0 && file !== 'Gulp';
		})[0];
	}
};
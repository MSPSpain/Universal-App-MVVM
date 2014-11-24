var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var files = {
	build: 'build/**/*.*',
	buildJS: 'build/code.js',
	buildCSS: 'build/styles.css',
	css: 'css/**/*.css',
	filePaths: ['Vendor/*.js', 'Base/*.js', 'Services/*.js', 'Models/*.js', 'ViewModels/*.js', 'Views/*.js', 'ServicesLocator.js', 'default.js'],
	index: 'default.html',
	indexBkp: 'default.html.bkp',
	scss: 'scss/*.scss'
};

var paths = {
	build: 'build',
	css: 'css',
	project: '',
	scss: 'scss'
};

// Compile Sass
gulp.task('sass', function(){
	return gulp.src(files.scss)
		.pipe(plugins.sass())
		.pipe(gulp.dest(paths.css));
});

// Inject JS & CSS Files
gulp.task('inject', function() {
	return gulp.src(files.index)
		.pipe(plugins.inject(
			gulp.src(files.filePaths, { read: false }),
			{
				transform: function (filepath) {
					if (filepath.indexOf('.js') > -1) {
						return '<script src="' + filepath + '"></script>'
					}
					// Css
					return ' <link rel="stylesheet" href="' + filepath + '">'
				}
			}
		))
		.pipe(gulp.dest(paths.project));
});

// Celan specific folders
gulp.task('clear', function () {

	// If exist indexBkp replace normal index and delete this
	gulp.src(files.indexBkp)
		.pipe(plugins.rename('default.html'))
		.pipe(gulp.dest(paths.project)); 

	return gulp.src(files.build, { read: false })
	   .pipe(plugins.clean({ force: true }));
});

// Build Files
gulp.task('buildFiles', function() {
	// Save index
	gulp.src(files.index)
		.pipe(plugins.clone())
		.pipe(plugins.rename('default.html.bkp'))
		.pipe(gulp.dest(paths.project));

	// Build files
	gulp.src(files.index)
		.pipe(plugins.usemin(
			{
				css: [plugins.minifyCss()],
				js: [plugins.uglify()]
			}
		))
		.pipe(gulp.dest(paths.project));
	
	gulp.src(files.buildJS)
		.pipe(plugins.uglify())
		.pipe(gulp.dest(paths.build));

	return gulp.src(files.buildCSS)
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest(paths.build));
});

// Init watch
gulp.task('watch', function () {
	gulp.watch(files.js, ['inject']);
	gulp.watch(files.scss, ['sass', 'inject']);
});

gulp.task('default', ['clear', 'inject', 'sass']);
gulp.task('build', ['default', 'buildFiles']);

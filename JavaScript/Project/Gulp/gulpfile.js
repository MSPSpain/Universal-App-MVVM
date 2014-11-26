// Dependencies
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var tasks = require('./tasks.js');
var runSequence = require('run-sequence');

// Project configuration
var projectName = tasks.getProjectName();
var projectPath = '../' + projectName + '/';
var project = projectPath + projectName.replace(' ', '_');

// Constants
var folders = {
    shared: '.Shared/',
    windows: '.Windows/',
    phone: '.WindowsPhone/'
};

var jsFiles = {
    phone: ['Views/*.js'],
    shared: ['Vendor/*.js', 'Base/*.js', 'Services/**/*.js', 'Models/*.js', 'ViewModels/*.js', 'AppConfig/ViewsDictionary.js', 'AppConfig/NavigatorService.js', 'AppConfig/ServicesLocator.js', 'default.js'],
    windows: ['Views/*.js']
};

var files = {
    build: 'build/**/*.*',
    buildJS: 'build/code.js',
    buildCSS: 'build/styles.css',
    index: 'default.html',
    indexBkp: 'default.html.bkp',
    scss: 'scss/*.scss'
};

var paths = {
    css: 'css',
    build: 'build'
};

// Inject JavaScript files
var injectJS = function (projectName) {
    var sharedFolder = project + folders.shared;
    var phoneFolder = project + folders.phone;
    var windowsFolder = project + folders.windows;
    
    var sharedFiles = tasks.getCorrectPaths(sharedFolder, jsFiles.shared);
    var phoneFiles = tasks.getCorrectPaths(phoneFolder, jsFiles.phone);
    var windowsFiles = tasks.getCorrectPaths(windowsFolder, jsFiles.windows);
    
    phoneFiles = sharedFiles.concat(phoneFiles);
    windowsFiles = sharedFiles.concat(windowsFiles);
    
    tasks.inject(phoneFolder, phoneFiles, files.index, folders, projectName || false);
    return tasks.inject(windowsFolder, windowsFiles, files.index, folders, projectName || false);
}

// Compile Sass
var sass = function () {
    var phoneFolder = project + folders.phone;
    var windowsFolder = project + folders.windows;
    
    tasks.sass(phoneFolder, files.scss, paths.css);
    return tasks.sass(windowsFolder, files.scss, paths.css);
};

// Clear index files
var clear = function () {
    var phoneFolder = project + folders.phone;
    var windowsFolder = project + folders.windows;
    
    tasks.clear(phoneFolder, files.indexBkp, files.index, files.build);
    return tasks.clear(windowsFolder, files.indexBkp, files.index, files.build);
};

// Build project files
var build = function () {
    var phoneFolder = project + folders.phone;
    var windowsFolder = project + folders.windows;
    
    tasks.build(phoneFolder, files.indexBkp, files.index, files.buildJS, files.buildCSS, paths.build);
    return tasks.build(windowsFolder, files.indexBkp, files.index, files.buildJS, files.buildCSS, paths.build);
};

// Tasks declarations
gulp.task('default:inject', function () {
    return injectJS();
});

gulp.task('default:sass', function () {
    return sass();
});

gulp.task('default:clear', function () {
    return clear();
});

gulp.task('build:injectProject', function () {
    return injectJS(projectName);
});

gulp.task('build:build', function () {
    return build();
});

// Tasks that you call
gulp.task('default', function () {
    return runSequence('default:clear', 'default:inject', 'default:sass');
});

gulp.task('build', function () {
    return runSequence('build:injectProject', 'build:build');
});

gulp.task('watch', function () {
    gulp.watch('../' + projectName + '/**/.js', ['default:inject']);
    gulp.watch('../' + projectName + '/**/.scss', ['default:sass']);
});

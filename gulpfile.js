var gulp = require('gulp');

var util = require('gulp-util');
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var mainBowerFiles = require('main-bower-files');


var config = {
    clientDestination: './website/client',
    sassPattern: 'sass/**/*.scss',
    production: !!util.env.production
};


/**
 * Task: Grab all main vendor files from bower dep list, concat, rename, minify/uglify on production only,
 * inject them to index.template.html then save to main index.html (.gitignored)
 */

gulp.task('publish-vendor-files', function() {
    var jsFilter = gulpFilter('*.js', {restore: true});
    var cssFilter = gulpFilter('*.css', {restore: true});
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'], {restore: true});

    // get all main bower files list from mainBowerFiles plugin
    return gulp.src(mainBowerFiles())

        // filter only js files
        .pipe(jsFilter)
        .pipe(gulp.dest(config.clientDestination + '/js/'))
        // concat to one vendor.js file
        .pipe(concat('vendor.js'))
        // on production uglify and rename to vendor.min.js
        .pipe(config.production ? uglify() : util.noop())
        .pipe(config.production ? rename({ suffix: ".min" }) : util.noop())
        // save to client dest
        .pipe(gulp.dest(config.clientDestination + '/js/'))
        .pipe(jsFilter.restore)

        // grab vendor css files from bower_components, minify(production) and push in /public
        .pipe(cssFilter)
        .pipe(gulp.dest(config.clientDestination + '/css'))
        .pipe(config.production ? minifycss() : util.noop())
        .pipe(config.production ? rename({ suffix: ".min" }) : util.noop())
        .pipe(gulp.dest(config.clientDestination + '/css'))
        .pipe(cssFilter.restore)

        // grab vendor font files from bower_components and push in /public
        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(config.clientDestination + '/fonts'));
});
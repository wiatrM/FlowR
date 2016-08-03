var gulp = require('gulp');

var util = require('gulp-util');
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var bower = require('gulp-main-bower-files');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var es = require('event-stream');
debug = require('gulp-debug');

var del =  require('del');


var config = {
    buildDestination: './client/dist',
    srcDestination: './client/src',
    tmpDestination: './client/.tmp',
    sassPattern: 'sass/**/*.scss',
    production: !!util.env.production
};


/**
 * Task: Grab all main vendor files from bower dep list, concat, rename, minify/uglify on production only,
 * SAVE THEM TO .tmp
 */

gulp.task('bower', function() {
    var jsFilter = gulpFilter('**/*.js', {restore: true});
    var cssFilter = gulpFilter('**/*.css', {restore: true});
    var lessFilter = gulpFilter('**/*.less', {restore: true});
    // get all main bower files list
    return gulp.src('./bower.json')
      .pipe(bower())
      // filter only js files
      .pipe(jsFilter)

      //concat to vendor.js
      .pipe(concat('vendor.js'))

      // on production uglify and rename to vendor.min.js
      .pipe(config.production ? uglify() : util.noop())
      .pipe(config.production ? rename({ suffix: ".min" }) : util.noop())

      // save them to .tmp folder now
      .pipe(gulp.dest(config.tmpDestination))
      .pipe(gulp.dest(config.buildDestination + '/js'))
      .pipe(jsFilter.restore)

      // now take css files
      .pipe(cssFilter)
      .pipe(concat('vendor.css'))

      .pipe(config.production ? minifycss() : util.noop())
      .pipe(config.production ? rename({ suffix: ".min" }) : util.noop())

      .pipe(gulp.dest(config.tmpDestination))
      .pipe(gulp.dest(config.buildDestination + '/css'))
      .pipe(cssFilter.restore)

      // now take less files
      .pipe(lessFilter)
      .pipe(concat('vendor.less'))
      .pipe(gulp.dest(config.tmpDestination))
      .pipe(gulp.dest(config.buildDestination + '/less'))

      // fonts
      .pipe(cssFilter.restore)
      .pipe(rename(function(path) {
        if (~path.dirname.indexOf('fonts')) {
          path.dirname = '/fonts'
        }
      }));

});

/**
 * Task: Inject all files from dist to src/index.template.html and save it to dist/index.html
 */
gulp.task('inject', ['bower'], function() {

  return gulp.src(config.srcDestination + '/index.template.html')

    // inject bower files
    .pipe(inject(gulp.src([config.buildDestination + '/js/**/*', config.buildDestination + '/css/**/*'], {read: false}), {name: 'bower'}))

    // inject app files
    .pipe(inject(
      gulp.src(config.buildDestination + '/app/**/*', {read: false})
        // !we MUST be sure that we include angular files in right order!
        .pipe(angularFilesort())
      , {name: 'app'})
    )

    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.buildDestination));
});

/**
 * Task: Main build task
 */
gulp.task('build', ['inject'], function() {

});

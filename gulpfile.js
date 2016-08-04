'use strict';

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
var debug = require('gulp-debug');
var rev = require('gulp-rev');
var gzip = require('gulp-gzip');
var runSequence = require('run-sequence');
var gulpsync = require('gulp-sync')(gulp);
var del = require('del');

var config = {
    buildDestination: './client/dist',
    srcDestination: './client/src',
    tmpDestination: './client/.tmp',
    production: !!util.env.production
};

/**
 * Task: Clean both .tmp and dist folders
 */
gulp.task('clean', function() {
  return del([
    config.tmpDestination + '/**/*', 
    '!' + config.tmpDestination + '/README.md',
    config.buildDestination + '/**/*', 
    '!' + config.buildDestination + '/README.md',
  ]);
});

/**
 * Task: Grab all main vendor files from bower dep list, concat, rename, minify/uglify on production only,
 * SAVE THEM TO client/dist
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

      // on production uglify, rev, gzip and rename to vendor.min.js
      .pipe(config.production ? uglify() : util.noop())
      //.pipe(config.production ? gzip() : util.noop()) // for now disabled
      .pipe(config.production ? rev() : util.noop())
      .pipe(config.production ? rename({ suffix: ".min" }) : util.noop())

      // save them to build folder now
      .pipe(gulp.dest(config.buildDestination + '/js'))
      .pipe(jsFilter.restore)

      // now take css files
      .pipe(cssFilter)
      .pipe(concat('vendor.css'))

      .pipe(config.production ? minifycss() : util.noop())
      //.pipe(config.production ? gzip() : util.noop()) // for now disabled
      .pipe(config.production ? rev() : util.noop())
      .pipe(config.production ? rename({ suffix: ".min" }) : util.noop())

      .pipe(gulp.dest(config.buildDestination + '/css'))
      .pipe(cssFilter.restore)

      // now take less files
      .pipe(lessFilter)
      .pipe(concat('vendor.less'))
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
 * Task: Grab all app angular files from project, concat, rename, minify/uglify on production only,
 * SAVE THEM TO client/dist
 */
gulp.task('app', function() {
    return gulp.src(config.srcDestination + '/app/**/*.js')
      // !we MUST be sure that we include angular files in right order!
      .pipe(angularFilesort())
      // on production CONCAT, uglify, rev, gzip and rename to app.min.js
      // we don't want to contact files in development for better debug controll
      .pipe(config.production ? concat('app.js') : util.noop())
      .pipe(config.production ? uglify() : util.noop())
      //.pipe(config.production ? gzip() : util.noop()) // for now disabled
      .pipe(config.production ? rev() : util.noop())
      .pipe(config.production ? rename({ suffix: ".min" }) : util.noop())

      .pipe(gulp.dest(config.buildDestination + '/app'))
});

/**
 * Task: Inject all files from dist to src/index.template.html and save it to dist/index.html
 */
gulp.task('inject', function() {

  return gulp.src(config.srcDestination + '/index.template.html')

    // inject bower files
    .pipe(inject(gulp.src([config.buildDestination + '/js/**/*', config.buildDestination + '/css/**/*'], {read: false}), {name: 'bower', ignorePath: 'client/dist'}))

    // inject app files
    .pipe(inject(
      gulp.src(config.buildDestination + '/app/**/*')
        // !we MUST be sure that we include angular files in right order!
        .pipe(angularFilesort())
      , {name: 'app', ignorePath: 'client/dist'})
    )
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.buildDestination));
});

/**
 * Task: Compile all SASS files to CSS files.
 */
gulp.task('sass', function () {
  return gulp.src(config.srcDestination + '/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    
    // min/gzip/rev on production
    .pipe(config.production ? minifycss() : util.noop())
    //.pipe(config.production ? gzip() : util.noop()) // for now disabled
    .pipe(config.production ? rev() : util.noop())
    .pipe(config.production ? rename({ suffix: ".min" }) : util.noop())
    .pipe(gulp.dest(config.buildDestination + '/css'));
});

/**
 * Task: Main build task. NOTE: must be run at least ONCE after installation
 */
gulp.task('build', function(cb) {
  // run tasks synchronously 
  runSequence(
    'clean',
    // those can be done async in paraell for speed-up
    ['bower', 'app', 'sass'],
    // wait for finish than...
    'inject',
    cb
  )
});

/**
 * Task: Rebuild bower. NOTE: gulp build MUST be run at least ONCE before calling that
 * Only working in development mode (production files will have changed names in template)
 */
gulp.task('rebuild:bower', function(cb) {
  // run tasks synchronously 
  runSequence(
    'bower',
    cb
  )
});

/**
 * Task: Rebuild app. NOTE: gulp build MUST be run at least ONCE before calling that
 * Only working in development mode (production files will have changed names in template)
 */
gulp.task('rebuild:app', function(cb) {
  // run tasks synchronously 
  runSequence(
    ['app','sass'],
    cb
  )
});

/**
 * Task: Test all components. Thiss will be run by Travis CI after commit.
 */
gulp.task('test:all', function(cb) {
  //runSequence(
    // mocha etc @TODO.
  //  cb
  //)
  return util.noop();
});

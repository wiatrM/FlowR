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


var config = {
    buildDestination: './client/dist',
    srcDestination: './client/src',
    tmpDestination: './client/.tmp',
    sassPattern: 'sass/**/*.scss',
    production: !!util.env.production
};


/**
 * Task: Grab all main vendor files from bower dep list, concat, rename, minify/uglify on production only,
 * inject them to index.template.html then save to main index.html (.gitignored)
 */

gulp.task('bower', function() {
    var jsFilter = gulpFilter('**/*.js', {restore: true})
    var cssFilter = gulpFilter('**/*.css', {restore: true})
    var lessFilter = gulpFilter('**/*.less', {restore: true})
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
      .pipe(jsFilter.restore)
      
      // now take css files
      .pipe(cssFilter)
      .pipe(concat('vendor.css'))
      .pipe(config.production ? minifycss() : util.noop())
      .pipe(config.production ? rename({ suffix: ".min" }) : util.noop())
      .pipe(gulp.dest(config.tmpDestination))
      .pipe(cssFilter.restore)
      
      // now take less files
      .pipe(lessFilter)
      .pipe(concat('vendor.less'))
      .pipe(gulp.dest(config.tmpDestination))
      
      // fonts
      .pipe(cssFilter.restore)
      .pipe(rename(function(path) {
        if (~path.dirname.indexOf('fonts')) {
          path.dirname = '/fonts'
        }
      }))
      .pipe(flatten())
      //.pipe(gulp.dest(config.tmpDestination))
});

'use strict';

var gulp = require('gulp');

var util = require('gulp-util');
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
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

// tests
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var config = {
    buildDestination: './client/dist',
    srcDestination: './client/src',
    tmpDestination: './client/.tmp',
    production: !!util.env.production
};

/**
 * Task: Clean both .tmp and dist folders
 */
gulp.task('clean', function () {
    return del([
        config.tmpDestination + '/**/*',
        '!' + config.tmpDestination + '/README.md',
        config.buildDestination + '/**/*',
        '!' + config.buildDestination + '/README.md'
    ]);
});

/**
 * Task: Grab all main vendor files from bower dep list, concat, rename, minify/uglify on production only,
 * SAVE THEM TO client/dist
 */
gulp.task('bower', function () {
    var jsFilter = gulpFilter('**/*.js', {
        restore: true
    });
    var cssFilter = gulpFilter('**/*.css', {
        restore: true
    });
    var lessFilter = gulpFilter('**/*.less', {
        restore: true
    });
    var robotoFontsFilter = gulpFilter('**/roboto-fontface/**/*.{eot,svg,ttf,woff,woff2}', {
        restore: true
    });
    var fontsFilter = gulpFilter(['**/*.{eot,svg,ttf,woff,woff2}', '!**/roboto-fontface/**/*.{eot,svg,ttf,woff,woff2}'], {
        restore: true
    });

    // get all main bower files list
    return gulp.src('./bower.json')
        .pipe(bower())
        .pipe(debug())

        // filter only js files
        .pipe(jsFilter)
        //concat to vendor.js
        .pipe(concat('vendor.js'))

        // on production uglify, rev, gzip and rename to vendor.min.js
        .pipe(config.production ? uglify() : util.noop())
        //.pipe(config.production ? gzip() : util.noop()) // for now disabled
        .pipe(config.production ? rev() : util.noop())
        .pipe(config.production ? rename({
            suffix: ".min"
        }) : util.noop())

        // save them to build folder now
        .pipe(gulp.dest(config.buildDestination + '/js'))
        .pipe(jsFilter.restore)

        // now take css files
        .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(config.production ? minifycss() : util.noop())
        //.pipe(config.production ? gzip() : util.noop()) // for now disabled
        .pipe(config.production ? rev() : util.noop())
        .pipe(config.production ? rename({
            suffix: ".min"
        }) : util.noop())
        .pipe(gulp.dest(config.buildDestination + '/css'))
        .pipe(cssFilter.restore)

        // now take less files
        .pipe(lessFilter)
        .pipe(concat('vendor.less'))
        .pipe(gulp.dest(config.buildDestination + '/less'))
        .pipe(lessFilter.restore)

        // roboto fonts
        .pipe(robotoFontsFilter)
        .pipe(flatten({includeParents: -1}))
        .pipe(gulp.dest(config.buildDestination + '/fonts'))
        .pipe(robotoFontsFilter.restore)
        // others fonts
        .pipe(fontsFilter)
        .pipe(flatten())
        .pipe(gulp.dest(config.buildDestination + '/fonts'))// bug: still include /roboto-fontface/
        .pipe(fontsFilter.restore);

});

/**
 * Task: Grab all app angular files from project, concat, rename, minify/uglify on production only,
 * SAVE THEM TO client/dist
 */
gulp.task('app', function () {
    var jsFilter = gulpFilter('**/*.js', {
        restore: true
    });
    var htmlFilter = gulpFilter('**/*.html', {
        restore: true
    });
    return gulp.src(config.srcDestination + '/app/**/*')
        .pipe(htmlFilter)
        .pipe(gulp.dest(config.buildDestination + '/app', {
            global: '.'
        }))
        .pipe(htmlFilter.restore)
        .pipe(jsFilter)
        // !we MUST be sure that we include angular files in right order!
        .pipe(angularFilesort())
        // on production CONCAT, uglify, rev, gzip and rename to app.min.js
        // we don't want to contact files in development for better debug controll
        .pipe(config.production ? concat('app.js') : util.noop())
        .pipe(config.production ? uglify() : util.noop())
        //.pipe(config.production ? gzip() : util.noop()) // for now disabled
        .pipe(config.production ? rev() : util.noop())
        .pipe(config.production ? rename({
            suffix: ".min"
        }) : util.noop())

        .pipe(gulp.dest(config.buildDestination + '/app', {
            global: '.'
        }))
        .pipe(jsFilter.restore)
});

/**
 * Task: Inject all files from dist to src/index.template.html and save it to dist/index.html
 */
gulp.task('inject', function () {

    return gulp.src(config.srcDestination + '/index.template.html')

    // inject bower files
        .pipe(inject(gulp.src([config.buildDestination + '/js/**/*', config.buildDestination + '/css/**/*', config.buildDestination + '/fonts/**/*'], {
            read: false
        }), {
            name: 'bower',
            ignorePath: 'client/dist'
        }))

        // inject app js files
        .pipe(inject(
            gulp.src(config.buildDestination + '/app/**/*.js')
            // !we MUST be sure that we include angular files in right order!
                .pipe(angularFilesort()), {
                name: 'app',
                ignorePath: 'client/dist'
            }))

        // inject app style files
        .pipe(inject(
            gulp.src(config.buildDestination + '/style/**/*'), {
                name: 'app',
                ignorePath: 'client/dist'
            }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(config.buildDestination));
});

/**
 * Task: Copy CSS files.
 */
gulp.task('css', function () {
    return gulp.src(config.srcDestination + '/css/**/*.css')
        .pipe(concat('app.css'))
        .pipe(config.production ? minifycss() : util.noop())
        //.pipe(config.production ? gzip() : util.noop()) // for now disabled
        .pipe(config.production ? rev() : util.noop())
        .pipe(config.production ? rename({
            suffix: ".min"
        }) : util.noop())
        .pipe(gulp.dest(config.buildDestination + '/style'));
});


/**
 * Task: Main build task. NOTE: must be run at least ONCE after installation
 */
gulp.task('build', function (cb) {
    // run tasks synchronously
    runSequence(
        'clean',
        // those can be done async in paraell for speed-up
        ['bower', 'app', 'css'],
        // wait for finish than...
        'inject',
        cb
    )
});

/**
 * Task: Rebuild bower. NOTE: gulp build MUST be run at least ONCE before calling that
 * Only working in development mode (production files will have changed names in template)
 */
gulp.task('rebuild:bower', function (cb) {
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
gulp.task('rebuild:app', function (cb) {
    // run tasks synchronously
    runSequence(
        ['app', 'css'],
        cb
    )
});

/**
 * Task: Test api_integration component
 */
gulp.task('test:api', function () {

    // get server code to test coverage...
    return gulp.src('./server/**/*.js')

        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            // Get Mocha tests
            gulp.src('./test/api_integration/**/*.js')
                .pipe(mocha({reporter: 'spec'}))
                .pipe(istanbul.writeReports({
                    dir: './coverage/api-test-coverage',
                    reporters: ['lcov'],
                    reportOpts: {
                        dir: './coverage/api-test-coverage'
                    }
                }))
                .once('error', function () {
                    process.exit(1);
                }).once('end', function () {
                process.exit();
            });
        });
});

/**
 * Task: Test api_integration component without coverage report
 */
gulp.task('test:api:nocov', function () {
    return gulp.src('./test/api_integration/**/*.js')
        .pipe(mocha({reporter: 'spec'}))
});

/**
 * Task: Test server UT component
 */
gulp.task('test:server', function () {

    // get server code to test coverage...
    return gulp.src('./server/**/*.js')

        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            // Get Mocha tests
            gulp.src('./test/server/**/*.js')
                .pipe(mocha({reporter: 'spec'}))
                .pipe(istanbul.writeReports({
                    dir: './coverage/server-test-coverage',
                    reporters: ['lcov'],
                    reportOpts: {
                        dir: './coverage/server-test-coverage'
                    }
                }));
        });
});

/**
 * Task: Test server UT component without coverage report
 */
gulp.task('test:server:nocov', function () {
    // get server code to test coverage...
    return gulp.src('./test/server/**/*.js')
        .pipe(mocha({reporter: 'spec'}))
});

/**
 * Task: Test all components. This will be run by Travis CI after commit.
 */
gulp.task('test:all', function (cb) {
    return runSequence(
        'test:server',
        'test:api',
        cb
    )
});

/**
 * Task: Test all components in fast mode (without code coverage report)
 */
gulp.task('test:all:nocov', function (cb) {
    return runSequence(
        'test:server:nocov',
        'test:api:nocov',
        cb
    )
});

/**
 * Task: Watch for code changes in test than reload the test in fast mode
 */
gulp.task('test:watch', function () {
    gulp.watch('./test/api_integration/**/*.js', ['test:api:nocov']);
    gulp.watch('./test/server/**/*.js', ['test:server:nocov']);
});

/**
 * Task: Watch for code changes in client source than reload the dist folder
 */
gulp.task('dev', function () {
    gulp.watch(config.srcDestination + '/**/*', ['rebuild:app']);
});

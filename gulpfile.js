// Generated on 2016-06-26 using generator-angular 0.15.1
'use strict';

// Inculde required modules
var gulp = require( 'gulp' );
var $load = require( 'gulp-load-plugins' )();
var fs = require( 'fs' );
var openURL = require( 'open' );
var rimraf = require( 'rimraf' );
var wiredep = require( 'wiredep' ).stream;
var runSequence = require( 'run-sequence' );
var argv = require( 'yargs' ).argv;
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var del = require('del');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');


// End required modules

// Configulre the folder and file paths
var config = {
    app: require( './bower.json' ).appPath || 'app',
    dist: 'dist',
    build: 'build'
};


var paths = {
    scripts: [  config.app + '/scripts/*.js' ],
    views: {
        main: config.app + '/index.html',
        files: [ config.app + '/views/**/*.html' ]
    }
};
// End configulre the folder and file paths


/*
################################################################################
Misc
################################################################################
*/

/**
* Task to auto inject bower components
* @require : stream from wiredep plugin
*/
gulp.task( 'bower', function () {
    return gulp.src( paths.views.main )
        .pipe( wiredep( {
            directory: 'bower_components',
            ignorePath: '..'
        } ) )
        .pipe( gulp.dest( config.app ) );
} );

/*
* Task to start server
* @require : gulp-load-plugins plugin
* @require : connect server plugin (part of gulp-load-plugins)
* @require : http-proxy-middleware plugin
*/
gulp.task( 'start:server', function () {
    $load.connect.server( {
        root: [ 'app', '.tmp' ],
        livereload: true,
        // Change this to '0.0.0.0' to access the server from outside.
        port: 9000,

        middleware: function ( connect ) {
            var middlewares = [];
            middlewares.push(
                connect().use( '/bower_components', connect.static( 'bower_components' ) )
            );
            return middlewares;
        }
    } );
} );

/*
* Task to start clint server
* This taks internally calls the following tasks :
* * start:server
* @require : open plugin
*/
gulp.task( 'start:client', [ 'start:server' ], function () {
    openURL( 'http://localhost:9000' );
} );

gulp.task('sass', function () {
  return gulp.src(config.app +'/styles/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.app +'/styles/'))
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src(config.app +'/*.html', {read: true});
});
gulp.task('javascript', function() {
  return gulp.src(config.app +'/scripts/*.js', {read: true});
});

/*
* Task to watch the files for reload the browser if any changes in css, html, js
* @require : gulp-load-plugins plugin
* @require : connect reload plugin
* @require : plumber plugin'
*/
function changed(file) {
  livereload.changed(file.path);
}
gulp.task( 'watch', function () {
   livereload.listen();
    $load.watch( paths.views.files )
        .pipe( $load.plumber() )
        .pipe( $load.connect.reload() );

    $load.watch( paths.scripts )
        .pipe( $load.plumber() )
        .pipe( $load.connect.reload() );
    gulp.watch(config.app +'/*.html', ['html']).on('change', changed);
    gulp.watch(config.app +'/scripts/*.js', ['javascript']).on('change', changed);
    gulp.watch(config.app +'/styles/sass/**/*.scss', ['sass']);
    gulp.watch( 'bower.json', [ 'bower' ] );
} );



/**
* copy images to dist
*/
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
  .pipe(gulp.dest('dist/images'))
})

/**
* copy font to dist
*/
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})
/**
* Clean
*/
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

/**
* Build
*/
gulp.task('build', [`clean:dist`, `sass`, `useref`, `images`, `fonts`], function (){
  console.log('Building files');
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

/**
* Task to serve the client for developement purpose
* This taks internally calls the following tasks :
* * clean:tmp
* * ng-config
* * start:client
* * watch
* @require : runSequence plugin
*/
gulp.task( 'serve', function ( cb ) {
    runSequence( 'clean:tmp', [ 'start:client' ],
        'watch', cb );
} );

/**
* Clean the tmp folder
* @require : rimraf plugin
*/
gulp.task( 'clean:tmp', function ( cb ) {
    rimraf( './.tmp', cb );
} );

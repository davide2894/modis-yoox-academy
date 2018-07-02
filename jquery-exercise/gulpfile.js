const gulp = require('gulp'),
	browserSync = require('browser-sync'),
	useref = require('gulp-useref'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify-es').default,
	pump = require('pump'),
	gulpIf = require('gulp-if'),
	cssnano = require('gulp-cssnano'),
	cleanCSS = require('gulp-clean-css'),
	cache = require('gulp-cache'),
	del = require('del'),
	runSequence = require('run-sequence'),
	autoprefixer = require('gulp-autoprefixer'),
	eslint = require('gulp-eslint'),
	babel = require('gulp-babel'),
	sourcemaps = require('gulp-sourcemaps'),
	lazypipe = require('lazypipe'),
	sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
})

gulp.task('lint', () => {
	// ESLint ignores files with "node_modules" paths.
	// So, it's best to have gulp ignore the directory as well.
	// Also, Be sure to return the stream from the task;
	// Otherwise, the task may end before the stream has finished.
	return gulp.src(['config.paths.js'])
		// eslint() attaches the lint output to the "eslint" property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('src/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
})


// Optimization Tasks 
// ------------------

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('useref', function(){
	return gulp.src('src/index.html')
		.pipe(sourcemaps.init())
		.pipe(useref({}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
		.pipe(gulpIf('css/*.css', cleanCSS({
			compatibility: 'ie8'
		})))		
		.pipe(gulpIf('js/*.js', uglify()))
		.pipe(sourcemaps.write('.')) // Write sourcemap file in same dest folder
		.pipe(gulp.dest('dist'));
})

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['useref', 'images', 'fonts'],
    callback
  )
})
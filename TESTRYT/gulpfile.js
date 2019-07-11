const gulp         = require('gulp'),
      plumber      = require('gulp-plumber'),
      // less         = require('gulp-less'),
      sass         = require('gulp-sass'), 
      autoprefixer = require('gulp-autoprefixer'),
      concat       = require('gulp-concat'),
      cleanCSS     = require('gulp-clean-css'),
      rename       = require('gulp-rename'),
      uglify       = require('gulp-uglify'),
      pug          = require('gulp-pug'),
      del          = require('del'),
      imagemin     = require('gulp-imagemin'),
      browserSync  = require('browser-sync');


gulp.task('styles', function() {
  return gulp.src('./src/sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src([ './src/js/jquery-3.2.1.slim.min.js', './src/js/libs/*.js', './src/js/main.js' ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('code', function() {
  return gulp.src('./dist/*.html')
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: './dist'
    },
    port: 5000,
    notify: false
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.scss', gulp.parallel('styles'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('scripts'));
  gulp.watch('./dist/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('server', 'watch'));
const gulp = require('gulp'),
  babel = require('gulp-babel'),
  webpackStream = require('webpack-stream'),
  del = require('del'),
  eslint = require('gulp-eslint'),
  uglify = require('gulp-uglify'),
  uglifyCSS = require('gulp-uglifycss'),
  ngAnnotate = require('gulp-ng-annotate');

gulp.task('eslint', () => {
  return gulp.src(['public/src/core/*.js', 'public/src/app.js', 'server.js',
    'test/e2e.js', 'test/tasks/MainTasks.js', 'gulpfile.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('babel', ['eslint'], () => {
  return gulp.src(['public/src/core/*.js',
    'public/src/app.js'])
      .pipe(babel())
      .pipe(gulp.dest('public/tmp'));
});

gulp.task('webpack', ['babel'], () => {
  return gulp.src('public/tmp/*.js')
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('uglify', ['webpack'], () => {
  return gulp.src('public/dist/bundle.js')
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('uglify-css', () => {
  return gulp.src('public/css/styles.css')
    .pipe(uglifyCSS())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('default', ['uglify', 'uglify-css'], () => {
  del(['public/tmp']);
});

const gulp = require('gulp'),
  babel = require('gulp-babel'),
  webpackStream = require('webpack-stream'),
  del = require('del'),
  eslint = require('gulp-eslint');

gulp.task('eslint', () => {
  return gulp.src(['public/src/core/*.js', 'public/src/app.js', 'server.js',
    'test/e2e.js', 'test/tasks/MainTasks.js', 'gulpfile.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('babel', ['eslint'], () => {
  return gulp.src(['public/src/core/*.js', 'public/src/app.js'])
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

gulp.task('default', ['webpack'], () => {
  del(['public/tmp']);
});

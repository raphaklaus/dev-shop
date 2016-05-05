const gulp = require('gulp'),
  babel = require('gulp-babel'),
  webpackStream = require('webpack-stream'),
  del = require('del'),
  eslint = require('gulp-eslint');

gulp.task('babel', () => {
  return gulp.src(['public/src/core/*.js', 'public/src/app.js', 'server/app.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
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

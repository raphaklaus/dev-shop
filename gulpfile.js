const gulp = require('gulp'),
  babel = require('gulp-babel'),
  webpackStream = require('webpack-stream'),
  del = require('del'),
  eslint = require('gulp-eslint');

gulp.task('babel', () => {
  return gulp.src(['src/core/*.js', 'src/app.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(gulp.dest('tmp'));
});

gulp.task('webpack', ['babel'], () => {
  return gulp.src('tmp/*.js')
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['webpack'], () => {
  del(['tmp']);
});

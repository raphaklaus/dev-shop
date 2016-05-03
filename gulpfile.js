var gulp = require('gulp');
var babel = require('gulp-babel');
var webpackStream = require('webpack-stream');
var del = require('del');

gulp.task('babel', () => {
  return gulp.src('src/core/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack', ['babel'], () => {
  return gulp.src('dist/*.js')
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['webpack'], () => {
  del(['dist/GitHubAPI.js']);
});

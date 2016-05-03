var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', () => {
  return gulp.src('src/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

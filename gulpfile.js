
  var gulp = require('gulp');

  var sass      = require('gulp-sass');
  var minifyCss = require('gulp-minify-css');

  var uglify = require('gulp-uglify');
  var concat = require('gulp-concat');

  //var imagemin = require('gulp-imagemin');
  //var pngquant = require('imagemin-pngquant');

  gulp.task('css', function(){
    return gulp.src('./public-src/scss/*.scss')
      .pipe(sass())
      .pipe(minifyCss())
      .pipe(gulp.dest('./public/css'));
  });

  gulp.task('js', function(){
    return gulp.src('./public-src/js/*.js')
      .pipe(concat('dist.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/js'));
  });

  /*
  "gulp-imagemin"     : "^2",
  "imagemin-pngquant" : "^4"

  gulp.task('images', function(){
    return gulp.src('src/images/*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('./assets/images'));
  });
  */

  gulp.task('watch', function(){
    gulp.watch('./public-src/scss/*.scss', ['css']);
    gulp.watch('./public-src/js/*.js', ['js']);
    //gulp.watch('./src/images/*.*', ['images']);
  });

  gulp.task('default', ['css', 'js', 'watch']); //  'images',

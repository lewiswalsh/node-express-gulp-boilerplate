
  var gulp = require('gulp');

  var sass          = require('gulp-sass');
  var minifyCss     = require('gulp-minify-css');

  var uglify = require('gulp-uglify');
  var concat = require('gulp-concat');

  //var imagemin = require('gulp-imagemin');
  //var pngquant = require('imagemin-pngquant');

  var paths = {
    sass   : './public-src/scss/**/*.scss',
    css    : './public/css',
    js_src : './public-src/js/**/*.js',
    js     : './public/js'
  };

  gulp.task('css', function(){
    return gulp.src(paths.sass)
      .pipe(sass())
      .pipe(minifyCss())
      .pipe(gulp.dest(paths.css));
  });

  gulp.task('js', function(){
    return gulp.src(paths.js_src)
      .pipe(concat('dist.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.js));
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
    gulp.watch(paths.sass, ['css']);
    gulp.watch(paths.js_src, ['js']);
    //gulp.watch('./src/images/*.*', ['images']);
  });


  gulp.task('default', ['css', 'js', 'watch']); //  'images',

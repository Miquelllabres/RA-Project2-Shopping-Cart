var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');   //makes a variable for uglifycss
var gulp = require('gulp'); //make a variable that requieres gulp


gulp.task('hello', function() {  // gulp is the variable + task
  console.log('Hello');
});

gulp.task('css', function () {
  gulp.src('./src/css/*.css')
  	.pipe(concat('all.css')) // it needs a name
  	.pipe(rename('style.min.css'))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/'));
});
//SASS
gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(concat('all.css')) // it needs a name
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scss', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
    });


//watch

gulp.task('watch', function () {
    // Endless stream mode 
     gulp.watch('./src/scss/*.scss', ['scss'])
     gulp.watch('./src/css/*.css', ['css'])
        });
 
// gulp.task('callback', function () {
//     // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
//     return watch('src/css/*.css', function () {
//         gulp.src('src/css/*.css')
//             .pipe(gulp.dest('build'));
//     });
// });

//webserver

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
    	directoryListing:{
    		enable:true,
    		path:'tmp'
    	},
      livereload: true,
      // directoryListing: true,
      open: true
    }));
});

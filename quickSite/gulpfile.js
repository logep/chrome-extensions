const { src, dest, parallel } = require('gulp');
// const pug = require('gulp-pug');
// const less = require('gulp-less');
// const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const uglify=require('gulp-uglify')

// function html() {
//   return src('client/templates/*.pug')
//     .pipe(pug())
//     .pipe(dest('dist/html'))
// }

// function css() {
//   return src('client/templates/*.less')
//     .pipe(less())
//     .pipe(minifyCSS())
//     .pipe(dest('build/css'))
// }

// return gulp.src(['/static/js/juicer-min.js','/static/js/bootstrap.min.js','/static/js/bootstrap-datetimepicker.min.js','/static/js/order_query.js'])  //选择合并的JS
function js() {
  return src('intro.js', { sourcemaps: false })
    .pipe(concat('intro.min.js'))
    .pipe(uglify())        
    .pipe(dest('dist', { sourcemaps: true }))
}

exports.js = js;
// exports.css = css;
// exports.html = html;
exports.default = parallel(js);
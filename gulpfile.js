const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
let uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-minify-css');
// var uglify = require('gulp-uglify');
gulp.task('jslibs', function() {
    return gulp.src([
        "public/plugins/jquery/jquery.min.js", 
        "public/plugins/bootstrap/js/bootstrap.js",
        "public/plugins/bootstrap-select/js/bootstrap-select.js",
        "public/plugins/jquery-slimscroll/jquery.slimscroll.js",
        "public/plugins/node-waves/waves.js",
        "public/plugins/jquery-sparkline/jquery.sparkline.js",
        "public/plugins/jquery-inputmask/jquery.inputmask.bundle.js",
        "public/plugins/multi-select/js/jquery.multi-select.js",
        "public/plugins/jquery-spinner/js/jquery.spinner.js",
        "public/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js",
        "public/plugins/nouislider/nouislider.js",
        "public/plugins/jquery-countto/jquery.countTo.js",
        ])
    .pipe(minify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/dest/'));
})

gulp.task('js-dashboard', function() {
    return gulp.src([
        "public/js/leaflet.js", 
        "public/js/maidenhead.js",
        "public/js/draw-map.js",
        "public/js/admin.js",
        "public/js/skinner.js",
        "public/js/dashboard.js",
        ])
    .pipe(uglify())
    .pipe(concat('dashboard.js'))
    .pipe(gulp.dest('public/dest/'));
})

gulp.task('css', function() {
    return gulp.src([
        'public/plugins/bootstrap/css/bootstrap.css', 
        'public/plugins/node-waves/waves.css',
        'public/plugins/animate-css/animate.css',
        'public/plugins/multi-select/css/multi-select.css',
        'public/plugins/jquery-spinner/css/bootstrap-spinner.css',
        'public/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css',
        'public/plugins/bootstrap-select/css/bootstrap-select.css',
        'public/plugins/dropzone/dropzone.css',
        'public/css/style.css',
        'public/css/themes/all-themes.css',
        ])
    .pipe(cleanCSS())
    .pipe(concat('my-style.css'))
    .pipe(gulp.dest('public/dest/'));
})

             
gulp.task('default', gulp.series('css', 'jslibs'));
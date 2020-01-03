const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    pngquant = require('gulp-pngquant');

const cssFiles = [
    './src/scss/**/*.scss',
    './src/scss/**/*.css'
];
const jsFiles = [
    './src/js/google-maps.js',
    './src/js/slick-carousel.min.js',
    './src/js/header-scroll.js',
    './src/js/scroll-to.js',
    './src/js/jquery.slicknav.min.js',
    './src/js/parallax.min.js',
    './src/js/init.js'
];

function css() {
    return gulp.src('./src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.stream())
}

function js() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./src/js/'))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        notify: false
    });
    gulp.watch(cssFiles, css);
    gulp.watch(jsFiles, js);
    gulp.watch("src/*.html").on('change', browserSync.reload);
}

gulp.task("sass", css);
gulp.task("js", js);
gulp.task("watch", watch);

function buildCss() {
    return gulp.src('./src/css/style.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            level: 2
        }))
        .pipe(gulp.dest('./dist/css/'))
}

function buildJs() {
    return gulp.src('./src/js/index.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
}

function buildHtml() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'))
}

function fonts() {
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts/'))
}

function favicon() {
    return gulp.src('./src/favicon.ico')
        .pipe(gulp.dest('./dist/'))
}

function buildImages() {
    return gulp.src('src/img/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'))
}

function clean() {
    return del(['dist/**'])
}

gulp.task('build', gulp.series(clean, gulp.parallel(buildCss, fonts, buildJs, buildHtml, buildImages, favicon)));
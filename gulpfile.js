'use strict';

    
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),	
	minifyCss = require('gulp-minify-css'),	
	autoprefixer = require('gulp-autoprefixer'),	
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;


var path = {
    build: {
        html: './build',
        js: './build/js',
        css: './build/css',
        img: './build/img',
        fonts: './build/fonts'
    },
    src: { 
        html: './src/*.html', 
        js: './src/js/custom.js',
        style: './src/scss/style.scss',
        img: ['./src/img/*.*', './src/img/**/*.*'], 
        fonts: ['./src/fonts/**/*.*', './src/fonts/*.*']
    }
};


gulp.task('getHtml', function(){
 return gulp.src(path.src.html)
    .pipe(plumber({
        errorHandler: notify.onError()
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});


gulp.task('getStyle', function(){
 return gulp.src(path.src.style)
    .pipe(plumber({
        errorHandler: notify.onError()
    }))    
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss())    
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});


gulp.task('getJs', function(){
 return gulp.src(path.src.js)
    .pipe(plumber({
        errorHandler: notify.onError()
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});


gulp.task('getImage', function(){
 return gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});


gulp.task('webserver', function () {
    browserSync.init({
        server: './build'
    });
});


gulp.task('build', [
    'getHtml',
    'getStyle',
    'getJs',
    'getImage'
]);


gulp.task('watcher', function(){
	gulp.watch('./src/scss/*.scss', ['getStyle']);
	gulp.watch('./src/*.html', ['getHtml']);
	gulp.watch('./src/js/*.js', ['getJs']);
	gulp.watch('./src/img/**/*.*', ['getImage']);
});

gulp.task('getWatch', ['webserver', 'watcher']);


//Настроить браузерСинк!  настроить стаиллинт
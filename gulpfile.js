'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    replace = require('gulp-replace'),
    livereload = require('gulp-livereload')

    var path = {
        build: { //Тут мы укажем куда складывать готовые после сборки файлы
            html: 'dist/html',
            js: 'dist/js/',
            css: 'dist/css/',
            images: 'dist/images/',
            fonts: 'dist/fonts/',
            icons: 'dist/icons/'
        },
        src: { //Папки где храняться исходники (создаваемые вручную и копируемые из bower_components)
            html: 'public_html/',
            js: 'src/js/',
            style: 'src/styles/',
            images: 'src/images/',
            fonts: 'src/fonts/',
            icons: 'src/icons/'
        },
        clean: './dist',
        bower: './bower_components',
    }
// var domain = 'https://www.sabidez.ru';
// var domainStatic = 'https://static.sabidez.ru';
var files = {
    src: { //Файлы, откуда брать исходники
        html: path.src.html + '*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: path.src.js + 'main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: path.src.style + 'main.scss',
        images: path.src.images + '**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: path.src.fonts + '**/*.*',
        icons: path.src.icons + '**/*.*'
        },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: path.src.html + '**/*.html',
        js: path.src.js + '**/*.js',
        style: path.src.style + '**/*.scss',
        images: path.src.images + '**/*.*',
        fonts: path.src.fonts + '**/*.*',
        icons: path.src.icons + '**/*.*'
    }
};

//Сборка CSS
gulp.task('style:build', function () {
    gulp.src(files.src.style) //Выберем наш main.scss
        //.pipe(rigger()) //Прогоним через rigger
        .pipe(sass().on('error', sass.logError)) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        //.pipe(cssmin()) //Сожмем
        // .pipe(replace('..', domainStatic))
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(livereload())
});

gulp.task('build', [
    // 'html:build',
    // 'js:build',
    // 'fonts:build',
    // 'images:build',
    // 'sprite:build',
    'style:build'
]);

gulp.task('watch', function(){
    livereload.listen({ start: true });
    // watch([files.watch.html], function(event, cb) {
    //     gulp.start('html:build');
    // });
    watch([files.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    // watch([files.watch.js], function(event, cb) {
    //     gulp.start('js:build');
    // });
    // watch([files.watch.images], function(event, cb) {
    //     gulp.start('images:build');
    // });
    // watch([files.watch.fonts], function(event, cb) {
    //     gulp.start('fonts:build');
    // });
    // watch([files.watch.icons], function(event, cb) {
    //     gulp.start('sprite:build');
    // });
});
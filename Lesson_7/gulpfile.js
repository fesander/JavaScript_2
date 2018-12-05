let gulp        = require('gulp'), // Подключаем gulp к проекту
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache       = require('gulp-cache'),
    autoprefixer= require('gulp-autoprefixer'),
    jsonServer  = require("gulp-json-srv"),
    jasmine     = require('gulp-jasmine');
    browserSync = require('browser-sync');

/**
 * Перезегрузка браузера
 */
gulp.task('browserSync', function () {
   browserSync({
       server: {
           baseDir: 'src',
           port: 4000
       }
   })
});

/**
 * Трансляция scss и sass файлов в scc
 */
gulp.task('scss', function(){
    return gulp.src('src/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade : true }))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js_build', function () {
    return gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/libs/jquery-ui/jquery-ui.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js'));
});

gulp.task('js_concat', ['clean-js'], function () {
    return gulp.src(['!src/js/libs.min.js','src/js/**/*.js'])
        .pipe(concat('common.js'))
        .pipe(gulp.dest('./src/js'));
});

gulp.task('css-libs', ['scss'], function () {
   return gulp.src('src/css/libs.css')
       .pipe(cssnano())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('src/css'))
});

gulp.task('clean', function () {
   return del.sync([
       'dist',
       'src/css',
       'src/js/common.js',
       'src/js/libs.min.js'
   ]);
});

gulp.task('clean-js', function () {
    return del.sync('src/js/common.js');
});

gulp.task('clear', function () {
   return cache.clearAll();
});

gulp.task('img', function () {
   return gulp.src('src/images/**/*')
       .pipe(cache(imagemin({
           interlaced: true,
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           une: [pngquant()]
       })))
       .pipe(gulp.dest('dist/images'))
});

gulp.task('watch', ['clean', 'json-start', 'browserSync', 'css-libs', 'js_build', 'js_concat'], function () {
    gulp.watch('src/scss/**/*.+(scss|sass)',['scss']);
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', ['js_concat',browserSync.reload]);
});

gulp.task('json-start', function(){
    let server = jsonServer.create({
        port: 4000
    });
    return gulp.src("src/json/dataBase.json")
        .pipe(server.pipe());
});

gulp.task('start_test', function () {
    return gulp.src('jasmine/specs/container.js')
    // return gulp.src('jasmine/lib/jasmine_examples/Player.js')
        .pipe(jasmine());
});

gulp.task('build', ['clean', 'img', 'css-libs', 'js_build', 'js_concat'], function () {
   let buildCss = gulp.src([
       'src/css/style.css',
       'src/css/libs.min.css'
   ])
       .pipe(gulp.dest('dist/css'));

    let buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    let buildJs = gulp.src([
        'src/js/common.js',
        'src/js/libs.min.js'
    ])
        .pipe(gulp.dest('dist/js'));

    let buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});
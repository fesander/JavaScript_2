How to work with gulp

1) Install node.js from the official cite https://nodejs.org/en/
2) > npm i gulp -g //Установка глобальной версии gulp на копьютер
3) > npm init // Инициальизация проекта. Создание базового файла фанифеста для проекта. После этого появляется package.json файл - манифест проекта
Содержит инфу об установленных пакетах
4) > npm i gulp --save-dev // Появилась папка node_modules. Таким образом устанавливаются зависимости gulp пакета
5) Создаем структуру проекта
    package.json
    node_modules
    gulpfile.js
    dist - готовый проект
    src - исходника
        css
        img
        fonts
        js
        libs                // для сторонних библиотек, например jquery плагины
        sass
            mine.sass
            lib.scss
        index.html

Разберем как роботает gulpfile.js
let gulp = require('gulp'); // Подключаем gulp к проекту. Каждый новый плагин нужно подключать отдельно

gulp.task('my_task', function(){
    return  gulp.src('source-files')    // базовая команда, которая берут файлы на обработку согласно выборки
            .pipe                       //вызов како-нибудь плагина
            .pipe(gulp.dest('folder'))  //dest куда выгружаем результат

6) > npm i gulp-sass --save-dev // Устанавливаем плагин для препроцессинга sass и scss
7) В файл gulpfile.js добавляем переменную
    let sass = require('gulp-sass');

    gulp.task('scss', function(){
        return gulp.src(['src/scss/**/*.+(scss|sass)', !src/scss/my.scss])   // Взяли все .sass и .scss файлы из src/scss кроме src/scss/my.scss
            .pipe(sass())                                           // Преобразовали его командой
            .pipe(gulp.dest('src/css/'))                            // Положили в новое место
            .pipe(browserSync.reload({                              // Перезагрузка (инжект) css изменений в браузер
                stream: true
            }));
    });

8) Создаем наблюдателя за изменениями

    gulp.task('watch', ['browserSync', 'scss', 'js_build'], function () {       // В [] записываются те таски, которые нужно выполнить до запуска таска watch
        gulp.watch('src/scss/**/*.scss',['scss']);                  // Первый аргумент - где следим, 2 - какие таскы выполняем
        gulp.watch('src/**/*.html', browserSync.reload)             // Следим за html и выполняем перезагрузку страницы
        gulp.watch('src/js/**/*.js', browserSync.reload)             // Следим за всеми js файлами и выполняем перезагрузку страницы
    });

9) Сделаем автоматическое обновление браузера
    > npm i browser-sync --save-dev

10) В файл gulpfile.js добавляем переменную
    let browserSync = require('browser-sync');

    gulp.task('browserSync', function () {
       browserSync({
           server: {
               baseDir: 'src'       // Выбираем папку, которая будет сервером
           },
           notiry: false            // отключаем уведомления
       })
    });

11) Изменим таску watch чтобы отслеиживать изменения в html-е

12) Для установки библиотек лучше использовать bower
    Для работы он требует git https://git-scm.com/download/win
    Нужно не забыть установить его в переменную PATH
        Щелкните правой кнопкой мыши на моем компьютере.
        Нажмите "Дополнительные параметры системы"
        Нажмите "Переменные среды"
        Затем в разделе "Системные переменные" найдите переменную пути и нажмите "Изменить"
        Добавьте путь к git s bin и cmd в конце строки следующим образом:
        ;C:\Program Files\Git\bin\git.exe;C:\Program Files\Git\cmd

    > npm i -g bower

    Создаем файл .bowerrc в корне и прописываем туду путь для установки библиотек
    {
      "directory" : "src/libs/"
    }

13) > bower i jquery magnific-popup             // Пример установки библиотеки. Запускать из директории, где лежит .bowerrc

14) > npm i gulp-concat                         // Сборка js файлов в один
    > npm i gulp-uglifyjs                       // Сжатие js файла

    Теперь задаем переменные в gulpfile.js


    let concat = require('gulp-concat');
    let uglify = require('gulp-uglifyjs');



    gulp.task('js_build', function () {
        return gulp.src([
            'src/libs/jquery/dist/jquery.min.js',
            'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
        ]
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dsrc/js'));
    });

15) Подключение css
    Создаем файл src/scss/libs.sass

    @import "src/libs/magnific-popup/dist/magnific-popup"   // Если нужно подключить css файл

16) Устанавливаем 2 расширения
    > npm i gulp-cssnano --save-dev
    > npm i gulp-rename --save-dev

    Обновляем gulpfile.js

    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),

    gulp.task('css-libs', ['scss'], function () {
       return gulp.src('src/css/libs.css')          // Выбрали файл для сжатия
           .pipe(cssnano())                         // Сжатие файла
           .pipe(rename({suffix: '.min'}))          // добавление индекса, чтобы понимать, что это уменьшенная копия файла
           .pipe(gulp.dest('src/css'))              // Куда кладем новый файл
    });

17) Установим пакет dell для очистки проета
    > npm i del --save-dev

    gulp.task('clean', function () {
       return del.sync([
           'dist',
           'src/css',
           'src/js/common.js',
           'src/js/libs.min.js'
       ]);
    });

18) Создаем таск build

    gulp.task('build', ['clean', 'css-libs', 'js_build', 'js_concat'], function () {
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

19) Оптимизация изображаний
    > npm i --save-dev gulp-imagemin imagemin-pngquant

    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),

    gulp.task('img', function () {
       return gulp.src('src/images/**/*')
           .pipe(imagemin({
               interlaced: true,
               progressive: true,
               svgoPlugins: [{removeViewBox: false}],
               une: [pngquant()]
           }))
           .pipe(gulp.dest('dist/img'))
    });

    Добавляем таску к билду и очистке

20) Для ускорения работы билда установим cache
    > npm i --save-dev gulp-cache

    cache       = require('gulp-cache'),

    Заабдейтим теску по работе с изображениями
    gulp.task('img', function () {
       return gulp.src('src/images/**/*')
           .pipe(cache(imagemin({
               interlaced: true,
               progressive: true,
               svgoPlugins: [{removeViewBox: false}],
               une: [pngquant()]
           })))
           .pipe(gulp.dest('dist/img'))
    });

21) Добавим таску очистки кэша
    Будет запускаться вручную

    gulp.task('clear', function () {
       return cache.clearAll();
    });

22) Добавим модуль для добавления префиксов для разных браузеров

    > npm i --save-dev gulp-autoprefixer

    autoprefixer= require('gulp-autoprefixer'),

    Модифицируем таску scss

    gulp.task('scss', function(){
        return gulp.src('src/scss/**/*.+(scss|sass)')
            .pipe(sass())
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade : true }))
            .pipe(gulp.dest('src/css/'))
            .pipe(browserSync.reload({
                stream: true
            }));
    });

23) Для установки всех зависимостей за раз в дирректории проекта, где лежит package.json файл запустить
    > npm i
    Поле этого установятся все пакеты из package.json
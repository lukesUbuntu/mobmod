var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var sourceName = 'MOD_Mob_BETA';
var watch = require('gulp-watch');

var manifest = require('./lib/manifest.json'),
    distroChromeStore = sourceName + ' v' + manifest.version + '.zip';    //for chromestore
distro = sourceName + '_v' + manifest.version + 'user.js';

//manifest.content_scripts.js = distro;
manifest.content_scripts[0].js[0] = distro;

gulp.task('buildUserScript', function () {
    return gulp.src(
        [
            './lib/top.js',
            './source/loaded.js',
            './lib/bottom.js'
        ])
        .pipe(concat(distro))
        .pipe(uglify())
        .pipe(gulp.dest('./build/chromeExtension/'))
        .pipe(gulp.dest('./build/firefox/'));

});
gulp.task('chromeExtension', function () {
    gulp.src('./lib/chromeextension/images/*')
        .pipe(gulp.dest('./build/chromeExtension/images/'));

    gulp.src('./lib/chromeextension/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/chromeExtension/'))

    return gulp.src(
        [
            './lib/chromeextension/*', '!./lib/chromeextension/*.js'
        ])
        .pipe(gulp.dest('./build/chromeExtension/'))
});


//clean build directory
gulp.task('clean', function () {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
});

gulp.task('updateManifest', ['chromeExtension'], function (cb) {
    //var file = path.join(__dirname, '/build/chromeExtension/manifest.json');
    fs.writeFile(__dirname + '/build/chromeExtension/manifest.json', JSON.stringify(manifest, null, 2), {
        flag: "w"
    }, function (err) {
        if (err) return console.log(err);

    });


});
gulp.task('watch', function() {
    watch(__dirname+ '/source/*.js', function() {
        gulp.run(['buildUserScript']);
    });
});

gulp.task('default', ['clean'], function () {
    gulp.start('chromeExtension');
    gulp.start('buildUserScript')
    gulp.start('updateManifest');
    gulp.start('watch');
});

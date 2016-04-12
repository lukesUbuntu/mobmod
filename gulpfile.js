var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


var mobWars = {
    version : '0.0.0.1',
    name : 'MOD_Mob_BETA',
    scripts : [
    './source/vendors/*.js',
    './source/topload/*.js',
    './source/settings.js',
    './source/mod/*.js',
    './source/launch.js'
    ],
    userScripts : [],
    userScripts_top :  ['./lib/top.js'],
    userScripts_bottom : ['./lib/bottom.js'],
    devMode : false,
    distro : '',
    manifest :  require('./lib/manifest.json'),
    init : function(){
        if (this.manifest.length <= 0) return console.log("Failed to init manifest")

        this.distro = this.name + '_v' + this.version ;


        this.manifest.content_scripts[0].js[0] = (this.devMode == true) ? this.distro + '.user.js' : this.distro + '.min.user.js';

            //this.manifest.content_scripts[0].js[0] = this.distro + 'min.user.js';

        this.userScripts = this.userScripts_top.concat(this.scripts).concat(this.userScripts_bottom);
       // this.userScripts.push(this.userScripts_bottom);




    }
};
//update mainfest scripts
mobWars.init();


gulp.task('buildUserScript', function () {
    fs.readFile(__dirname + '/source/menu.html', function(err, data) {
        //var base64data = new Buffer(data).toString('base64');
        var theme = "MOD.mainMenu = '" + new Buffer(data).toString('base64') + "'";

        fs.writeFile(__dirname + '/source/topload/mainmenu.js', theme, {
            flag: "w"
        }, function (err) {
            if (err) return console.log("buildUserScript",err);

            console.log("created",mobWars.manifest.content_scripts[0].js[0]);

            if (mobWars.devMode == true)
               return gulp.src(mobWars.userScripts)
                    .pipe(concat(mobWars.manifest.content_scripts[0].js[0]))
                    .pipe(gulp.dest('./build/chromeExtension/'))
                    .pipe(gulp.dest('./build/userscript/'));



                return gulp.src(mobWars.userScripts)
                    .pipe(concat(mobWars.manifest.content_scripts[0].js[0]))
                    .pipe(uglify())
                    .pipe(gulp.dest('./build/chromeExtension/'))
                    .pipe(gulp.dest('./build/userscript/'));



        });
    });


});
gulp.task('buildMenu', function () {
    fs.readFile(__dirname + '/source/menu.html', function(err, data) {
        //var base64data = new Buffer(data).toString('base64');
        var theme = "MOD.mainMenu = '" + new Buffer(data).toString('base64') + "'";

        fs.writeFile(__dirname + '/source/topload/mainmenu.js', theme, {
            flag: "w"
        }, function (err) {
            if (err) return console.log(err);

        });
    });
});
gulp.task('buildDistro',['buildMenu'], function () {

    return gulp.src(mobWars.scripts)
        .pipe(concat(mobWars.name + '_distro.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./distro/'));
});


gulp.task('chromeExtension', function () {
    gulp.src('./lib/chromeextension/images/*')
        .pipe(gulp.dest('./build/chromeExtension/images/'));

    gulp.src('./lib/chromeextension/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/chromeExtension/'));

    return gulp.src(
        [
            './lib/chromeextension/*', '!./lib/chromeextension/*.js'
        ])
        .pipe(gulp.dest('./build/chromeExtension/'))

});


//clean build directory
gulp.task('clean', function () {
    return gulp.src(['build/*', 'distro/*','source/topload/mainmenu.js'], {read: false})
        .pipe(clean());
});

gulp.task('buildChrome', ['chromeExtension'], function (cb) {
    //var file = path.join(__dirname, '/build/chromeExtension/manifest.json');
    fs.writeFile(__dirname + '/build/chromeExtension/manifest.json', JSON.stringify(mobWars.manifest, null, 2), {
        flag: "w"
    }, function (err) {
        if (err) return console.log(err);

    });
});



gulp.task('watch', function () {
    /*
    watch(mobWars.scripts, function () {
        gulp.run(['buildUserScript']);
    });
    */
    watch('./source/**/*.js', function () {
        gulp.run(['buildUserScript']);
    });
});

gulp.task('default', ['clean'], function () {
    var build = getArg("--build");

    if (/chrome/i.test(build) || build === true) {
        console.log("Building Chrome Extension", (build === true) ? " & userscript" : '');
        gulp.start('buildChrome');
        gulp.start('buildUserScript');
    }
    if (/userscript/i.test(build)) {
        console.log("Building userscript")
        gulp.start('buildUserScript');
    }

    if (getArg("--watch")) {
        mobWars.devMode = true;
        mobWars.init();

        console.log("watching source folder for changes")
        gulp.start('buildChrome');
        gulp.start('buildUserScript');
        gulp.start('watch');
    }

    gulp.start('buildDistro');
});

function getArg(key) {
    var index = process.argv.indexOf(key);
    var next = process.argv[index + 1];
    return (index < 0) ? null : (!next || next[0] === "-") ? true : next;
}
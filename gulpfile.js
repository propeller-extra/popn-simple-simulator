var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');

//EJS(テンプレートエンジン)
gulp.task("ejs", function (done) {
    gulp.src(
        ["views/*.ejs"] // "app.js"  と  "views/*.ejs"  を手動で切り替えろ！！複数指定のやり方とか知らんｗｗｗ
    )
        .pipe(ejs())
        .pipe(rename({
            extname: ".html"
        })) //拡張子をhtmlに
        .pipe(gulp.dest("dest/")); //出力先
    done();
});

gulp.task('deploy', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});
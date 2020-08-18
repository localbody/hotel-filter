gulp = require("gulp")
pug = require("gulp-pug")

gulp.task("pug", function () {
    return gulp.src("./src/templates/pages/*.pug")
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("./build"))
})

gulp.task("watch", function () {
    gulp.watch("./src/templates/**/*.pug", gulp.parallel("pug"))
})

gulp.task("default", gulp.parallel("watch"))
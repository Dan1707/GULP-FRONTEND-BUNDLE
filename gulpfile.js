const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");

// Compile SASS to CSS and minify
gulp.task("sass", () => {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// Minify JavaScript
gulp.task("minify-js", () => {
  return gulp.src("src/js/**/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
});

// Include files and minify HTML
gulp.task("html", () => {
  return gulp
    .src("src/html/**/*.html")
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(gulp.dest("dist/html"))
    .pipe(browserSync.stream());
});

// Watch for changes in files
gulp.task("watch", () => {
  browserSync.init({
    server: "./dist",
  });

  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("src/js/**/*.js", gulp.series("minify-js"));
  gulp.watch("src/html/**/*.html", gulp.series("html"));
});

// Default task to run all tasks in parallel
gulp.task("default", gulp.parallel("sass", "minify-js", "html", "watch"));

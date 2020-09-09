"use strict";

var gulp = require("gulp");

var plumber = require("gulp-plumber");

var sourcemap = require("gulp-sourcemaps");

var sass = require("gulp-sass");

var postcss = require("gulp-postcss");

var autoprefixer = require("autoprefixer");

var csso = require("gulp-csso");

var rename = require("gulp-rename");

var htmlmin = require("gulp-htmlmin");

var uglify = require("gulp-uglify");

var pipeline = require("readable-stream").pipeline;

var imagemin = require("gulp-imagemin");

var webp = require("gulp-webp");

var svgstore = require("gulp-svgstore");

var del = require("del");

var sync = require("browser-sync").create(); // Styles


var styles = function styles() {
  return gulp.src("source/sass/style.scss").pipe(plumber()).pipe(sourcemap.init()).pipe(sass()).pipe(postcss([autoprefixer()])).pipe(csso()).pipe(rename("styles.min.css")).pipe(sourcemap.write(".")).pipe(gulp.dest("build/css")).pipe(sync.stream());
};

exports.styles = styles; // HTML

var html = function html() {
  return gulp.src("source/*.html").pipe(htmlmin({
    collapseWhitespace: true
  })).pipe(gulp.dest("build"));
};

exports.html = html; // JS

var js = function js() {
  return pipeline(gulp.src("source/js/*.js"), uglify(), rename("scripts.min.js"), gulp.dest("build/js"));
};

exports.js = js; //Images

var images = function images() {
  return gulp.src("source/img/**/*.{jpg,png,svg}").pipe(imagemin([imagemin.optipng({
    optimizationLevel: 3
  }), imagemin.mozjpeg({
    quality: 85,
    progressive: true
  }), imagemin.svgo()]));
};

exports.images = images; //Webp

var webpImg = function webpImg() {
  return gulp.src("build/img/**/*.{png,jpg}").pipe(webp({
    quality: 90
  })).pipe(gulp.dest("build/img"));
};

exports.webpImg = webpImg; //Sprite

var sprite = function sprite() {
  return gulp.src("source/img/**/icon-*.svg").pipe(svgstore()).pipe(rename("sprite.svg")).pipe(gulp.dest("build/img"));
};

exports.sprite = sprite; // Clean

var clean = function clean() {
  return del("build");
};

exports.clean = clean; // Copy

var copy = function copy() {
  return gulp.src(["source/fonts/**/*.{woff,woff2}", "source/img/**", "source/js/**"], {
    base: "source"
  }).pipe(gulp.dest("build"));
}; // Server


var server = function server(done) {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false
  });
  done();
};

exports.server = server; // Watcher

var watcher = function watcher() {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/*.js", gulp.series("js"));
  gulp.watch("source/*.html").on("change", sync.reload);
};

exports["default"] = gulp.series(clean, copy, styles, webpImg, sprite, html, js, server, watcher); // Build

var build = gulp.series(clean, copy, html, styles, webpImg, js, sprite);
exports.build = build; // Start

var start = gulp.series(build, server, watcher);
exports.start = start;
const gulp = require("gulp");
const comments = require("gulp-header-comment");
const fileInclude = require("gulp-file-include");
const sitemap = require("gulp-sitemap");
const htmlmin = require("gulp-htmlmin");

const bs = require("browser-sync");
const path = {
  src: {
    html: "src/**/*.html",
  },
};

gulp.task("html", () => {
  return (
    gulp
      .src(path.src.html)
      .pipe(
        fileInclude({
          basepath: "src/partials",
        })
      )
      // .pipe(
      //   sitemap({
      //     siteUrl: "https://jaipurcardiologist.com",
      //   }),
      // )
      .pipe(
        comments(`Website for Dr. Nitin Gupta by Vedik Dev (Himanshu Jangid)`)
      )
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("./docs"))
  );
});

gulp.task("copy-assets", async function () {
  const imagemin = await import("gulp-imagemin");
  return gulp
    .src(["src/assets/**"])
    .pipe(
      imagemin.default([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest("./docs/assets"));
});

gulp.task("copy-images", function () {
  return gulp.src(["src/img/**"]).pipe(gulp.dest("./docs/img"));
});

gulp.task("copy-lib", function () {
  return gulp.src(["src/lib/**"]).pipe(gulp.dest("./docs/lib"));
});

gulp.task("copy-js", function () {
  return gulp.src(["src/js/**"]).pipe(gulp.dest("./docs/js"));
});

gulp.task("copy-css", function () {
  return gulp.src(["src/css/**"]).pipe(gulp.dest("./docs/css"));
});

gulp.task("copy-scss", function () {
  return gulp.src(["src/scss/**"]).pipe(gulp.dest("./docs/scss"));
});

gulp.task("copy-videos", function () {
  return gulp.src(["src/videos/**"]).pipe(gulp.dest("./docs/videos"));
});

gulp.task("watch:html", function () {
  gulp.watch(["src/**"], gulp.series("html"));
});

gulp.task(
  "default",
  gulp.series(
    "html",
    "copy-assets",
    "copy-images",
    "copy-lib",
    "copy-js",
    "copy-scss",
    "copy-videos",
    "copy-css",
    gulp.parallel("watch:html", function () {
      bs.init({
        server: "docs/",
      });
    })
  )
);

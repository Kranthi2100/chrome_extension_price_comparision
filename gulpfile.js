const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');
const g_browserify = require('gulp-browserify');
const glob = require('glob');
const path = require('path');
const es = require('event-stream');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const errorHandler = {
  plumber: {
    errorHandler: function (err) {
      console.log(err);
      // notify.onError({
      //   title: "Gulp error in " + err.plugin,
      //   message:  err.toString()
      // })(err);
    }
  }
};

gulp.task('resource', function () {
  gulp.src('src/resource/**', { base: 'src' })
    .pipe(gulp.dest('extension'));
});
  
gulp.task('rogue', function () {
  gulp.src(['src/*.js', 'src/*.json'], { base: 'src' })
  .pipe(gulp.dest('extension'));
});

gulp.task('code', ['popup-code', 'options-code', 'content-code']);

gulp.task('popup-code', function (done) {
  glob('./src/popup/*.js', function(err, files) {
    if(err) done(err);
    const tasks = files.map(function(entry) {
      const fileName = path.basename(entry);
      const dist = `./${fileName}`;
      return browserify({ entries: [entry] })
        .bundle()
        .on('error', function(err){
          console.log(err.stack);
          this.emit('end');
        })
        .pipe(source(dist))
        .pipe(rename({
          extname: '.js'
        }))
        // .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./extension/popup'));
    });
    es.merge(tasks).on('end', done);
  })
});
  
gulp.task('options-code', function (done) {
  glob('./src/options/*.js', function(err, files) {
    if(err) done(err);
    const tasks = files.map(function(entry) {
      const fileName = path.basename(entry);
      const dist = `./${fileName}`;
      return browserify({ entries: [entry] })
        .bundle()
        .on('error', function(err){
          console.log(err.stack);
          this.emit('end');
        })
        .pipe(source(dist))
        .pipe(rename({
          extname: '.js'
        }))
        // .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./extension/options'));
    });
    es.merge(tasks).on('end', done);
  })
});

gulp.task('content-code', function(done){
  glob('./src/content_scripts/sites/**/*.js', function(err, files) {
    if(err) done(err);
    const tasks = files.map(function(entry) {
      const parentDir = path.basename(path.dirname(entry));
      const fileName = path.basename(entry);
      const dist = `./${parentDir}/${fileName}`;
      return browserify({ entries: [entry] })
        .bundle()
        .on('error', function(err){
          console.log(err.stack);
          this.emit('end');
        })
        .pipe(source(dist))
        .pipe(rename({
          extname: '.js'
        }))
        // .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./extension/content_scripts'));
    });
    es.merge(tasks).on('end', done);
  })
});
  
gulp.task('content-style', function () {
  gulp.src(`src/content_scripts/sites/**/*.scss`)
  .pipe(plumber(errorHandler.plumber))
  .pipe(sass())
  .pipe(gulp.dest('extension/content_scripts'));
});

gulp.task('style',['content-style'], function () {
  gulp.src(['src/options/*.scss', 'src/popup/*.scss'], { base: 'src' })
  .pipe(plumber(errorHandler.plumber))
  .pipe(sass())
  .pipe(gulp.dest('extension'));
});

gulp.task('html', function () {
  gulp.src(['src/options/*.html', 'src/popup/*.html'], { base: 'src' })
  .pipe(gulp.dest('extension'));
});

gulp.task('default', ['html', 'code', 'style', 'resource', 'rogue', 'content-style']);


gulp.task('browserSync', function(){
  browserSync.init({
    server: {
        baseDir: "./extension"
    }
  });
})

gulp.task('watch',['browserSync'], function(){
  gulp.watch('src/**', ['default', browserSync.reload]);
})

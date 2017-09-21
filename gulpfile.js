var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require("gulp-jshint"),
    concat = require("gulp-concat"),

    imagemin = require("gulp-imagemin"),
    pngquant = require('imagemin-pngquant'); //png图片压缩插件
    spritesmith = require('gulp.spritesmith');//css-spirate
    

// 压缩css 任务
gulp.task('minifyCss',function(){
  return gulp.src('src/css/test.css') //获取该任务需要的文件
      .pipe( minifyCss() )                  //该任务调用的模块
      .pipe(rename('test.min.css'))
      .pipe( gulp.dest('dist/css') );   //将在 src/css 文件夹中生产test.css
});

// 压缩html 任务
gulp.task('minifyHtml',function(){
  return gulp.src('src/html/test.html') //获取该任务需要的文件
      .pipe( minifyHtml() )                  //该任务调用的模块
      .pipe(rename('test.min.html'))
      .pipe( gulp.dest('dist/html') );   //将在 src/css 文件夹中生产test.css
});
// 压缩js任务
gulp.task('uglify',function(){
  return gulp.src('src/js/test.js') //获取该任务需要的文件
      .pipe( minifyHtml() )                  //该任务调用的模块
      .pipe(rename('test.min.js'))
      .pipe( gulp.dest('dist/js') );   //将在 src/css 文件夹中生产test.css
});
// js代码检查
gulp.task('jshint', function () {
    gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
});
// 文件合并
gulp.task('concat', function () {
    gulp.src('src/js/*.js')  //src/*.js
    .pipe(concat('all.js'))  //所有的文件concat到all.js 在dist/js里面
    .pipe(gulp.dest('dist/js')); // 输出检查结果
});
    // 图片压缩
    gulp.task('imagemin', function () {
      return gulp.src('src/images/*')
      .pipe(imagemin({
        progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
          }))
      .pipe(gulp.dest('dist/images'));
    });
    // 图片合并
    gulp.task('sprite', function () {
      var spriteData = gulp.src('src/images/*.jpg')
       .pipe(spritesmith({
        imgName: 'sprite.jpg',
        cssName: 'sprite.css'
      }));
      return spriteData.pipe(gulp.dest('dist/sprite/'));
    });

// 默认任务
gulp.task('default',['minifyCss']);
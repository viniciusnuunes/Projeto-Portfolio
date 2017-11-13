// gulp.task = Define uma tarefa
// gulp.src = Define o caminho dos arquivos que serão manipulados
// gulp.dest = Define o destino dos arquivos manipulados
// gulp.watch = Utilizado para observar mudanças em arquivos
// gulp.pipe = Utilizado para dar continuidade na execução das tarefas

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var minifyCss = require('gulp-minify-css');
var reload = browserSync.reload;

/* gulp.task('gulp', function(){
  gulp.src('/dev')
  .pipe(gulp().on('error', gulp.logError))
  .pipe(gulp.dest('dist'));
}); */

 var paths = {
  sass: ['./dev/sass/main.scss'],
  css: ['./dev/sass/base/*.scss'],
  script: ['./dev/js/*.js'],
  htmls: ['./dev/**/*.html'],
  index: ['./dev/index.html'],
  libs: ['./dev/lib/*.js']
 };

 var dests = {

 };

gulp.task('default', ['server', 'watch', 'html-compile', 'sass-compile', 'scripts-compile']);

/* Inicia o servidor */
gulp.task('server', function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});

/* compilando sass para css e salvando no dist */
gulp.task('sass-compile', function() {
  return gulp.src(paths.sass)
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./dist/css'));
});

/* passando os scripts para o dist */
gulp.task('scripts-compile', function(){
  gulp.src(paths.libs)
  .pipe(gulp.dest('./dist/lib'));
  gulp.src(paths.script)
  .pipe(gulp.dest('./dist/js'));
});

/* passando o html para o dist */
gulp.task('html-compile', function(){
  gulp.src(paths.index)
  .pipe(gulp.dest('./dist'));
});

/* Aguarda por alterações nos arquivos */
gulp.task('watch', function(){
  gulp.watch(paths.css, ['sass-compile']).on('change', reload);
  gulp.watch(paths.htmls, ['html-compile']).on('change', reload);
});

// https://www.npmjs.com/package/gulp-typescript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
 
var tsProject = ts.createProject({
    declarationFiles: true,
    module: 'commonjs'
});
 
gulp.task('transpile', function() {
    var tsResult = gulp.src([
		'lib/**/*.ts',
		'!lib/definitions/**/*.d.ts',
		'Scripts/typings/**/*.ts', 
		'typings/**/*.ts'])
                    .pipe(ts(tsProject));
 
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('lib/definitions')),
        tsResult.js.pipe(gulp.dest('lib/js'))
    ]);
});

gulp.task('default', ['transpile']);

gulp.task('clean', function(done) {
	del(['lib/js/*.js', 'lib/definitions'], done);
});

gulp.task('watch', ['transpile'], function() {
    gulp.watch('lib/**/*.ts', ['transpile']);
});

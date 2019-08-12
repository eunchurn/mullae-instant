import gulp from 'gulp';
import del from 'del';
import prod from './gulp/prod';
import dev from './gulp/dev';

const clean = () => del(['dist/']);

// "dev:client": "webpack-dev-server --watch --progress --colors --env.env=dev",
exports.dev = gulp.series(clean, dev);
exports.build = gulp.series(clean, prod);

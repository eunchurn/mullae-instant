import gulp from 'gulp';
import del from 'del';
import prod from './gulp/prod';
import dev from './gulp/dev';
import deploy from './gulp/deploy';

const clean = () => del(['dist/']);
const clearPublish = () => del(['.publish']);

// "dev:client": "webpack-dev-server --watch --progress --colors --env.env=dev",
exports.dev = gulp.series(clean, dev);
exports.build = gulp.series(clean, prod);
exports.deploy = gulp.series(clean, prod, deploy, clearPublish);

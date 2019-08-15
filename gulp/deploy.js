import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';

// "deploy": "gh-pages -d dist -o deploy -b master",
const deploy = () =>
  gulp.src('./dist/**/*').pipe(
    ghPages({
      remoteUrl: 'git@github.com-underscore:we-underscore/mullaeinstant.git',
      branch: 'master',
    }),
  );

export default deploy;

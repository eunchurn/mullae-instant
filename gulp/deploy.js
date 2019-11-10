import gulp from "gulp";
import gitdeploy from "gulp-deploy-git";

// "deploy": "gh-pages -d dist -o deploy -b master",
const deploy = () =>
  gulp.src("./dist/**/*", { read: false }).pipe(
    gitdeploy({
      repository: "git@github.com-underscore:we-underscore/mullaeinstant.git",
      prefix: "dist",
      remoteBranch: "master",
      verbose: true,
      debug: true,
    }),
  );

export default deploy;

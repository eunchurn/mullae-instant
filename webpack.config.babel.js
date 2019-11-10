import webpackMerge from "webpack-merge";
import buildValidations from "./build-utils/build-validations";
import devConfig from "./build-utils/webpack.dev";
import prodConfig from "./build-utils/webpack.prod";
import commonConfig from "./build-utils/webpack.common";

// 'env'는 'package.json' 내 'scripts'의 환경 변수를 포함한다.
// console.log(env); => { env: 'dev' }
module.exports = env => {
  // 'buildValidations'를 사용해 'env' 플래그를 확인한다.
  if (!env) {
    throw new Error(buildValidations.ERR_NO_ENV_FLAG);
  }

  // 개발 또는 프로덕션 모드 중 사용할 웹팩 구성을 선택한다.
  // console.log(env.env); => dev
  let mergedConfig = {};
  if (env.env === "prod") {
    mergedConfig = webpackMerge(commonConfig, prodConfig);
  } else {
    mergedConfig = webpackMerge(commonConfig, devConfig);
  }

  // console.log(mergedConfig)
  // 웹팩 최종 구성을 반환한다.
  return mergedConfig;
};

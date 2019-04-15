const buildValidations = require('./build-utils/build-validations');
const commonConfig = require('./build-utils/webpack.common');

const webpackMerge = require('webpack-merge');

// 애드온(addon)으로 웹팩 플러그인을 추가할 수 있다. 
// 개발할 때마다 실행할 필요가 없다.
// '번들 분석기(Bundle Analyzer)'를 설치할 때가 대표적인 예다.
const addons = (/* string | string[] */ addonsArg) => {
  
  // 애드온(addon) 목록을 노멀라이즈(Normalized) 한다.
  let addons = [...[addonsArg]] 
    .filter(Boolean); // If addons is undefined, filter it out

  return addons.map(addonName =>
    require(`./build-utils/addons/webpack.${addonName}.js`)
  );
};

// 'env'는 'package.json' 내 'scripts'의 환경 변수를 포함한다.
// console.log(env); => { env: 'dev' }
module.exports = env => {

  // 'buildValidations'를 사용해 'env' 플래그를 확인한다.
  if (!env) {
    throw new Error(buildValidations.ERR_NO_ENV_FLAG);
  }

  // 개발 또는 프로덕션 모드 중 사용할 웹팩 구성을 선택한다.
  // console.log(env.env); => dev
  const envConfig = require(`./build-utils/webpack.${env.env}.js`);
  
  // 'webpack-merge'는 공유된 구성 설정, 특정 환경 설정, 애드온을 합친다.
  const mergedConfig = webpackMerge(
    commonConfig,
    envConfig,
    ...addons(env.addons)
  );

  // 웹팩 최종 구성을 반환한다.
  return mergedConfig;
};
# React Webpack ES6 Boilerplate
## [Esau Silva](https://medium.freecodecamp.org/learn-webpack-for-react-a36d4cac5060) 튜토리얼 기반 [번역](https://sujinlee.me/webpack-react-tutorial/) based features
- Hot Module Replacement (HMR)
- Code Split (by Chunk)
- Code Split (by Vendor)
- Production build (Webpack config files)
- Webpack Composition

## Additional features
- Polyfill Applied

`index.js`
```
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
```

`polyfill.js`

IE9, IE10 and IE11 requires all of the following polyfills.
```
import 'core-js/es6/symbol'
import 'core-js/es6/object'
import 'core-js/es6/function'
import 'core-js/es6/parse-int'
import 'core-js/es6/parse-float'
import 'core-js/es6/number'
import 'core-js/es6/math'
import 'core-js/es6/string'
import 'core-js/es6/date'
import 'core-js-pure/es/array'
import 'core-js/es6/regexp'
import 'core-js-pure/es/map'
import 'core-js/es6/weak-map'
import 'core-js-pure/es/set'
import 'core-js-pure/es/object'
```
IE10 and IE11 requires the following for the Reflect API.
```
import 'core-js/es6/reflect'
```
Evergreen browsers require these. Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
```
import 'core-js/es7/reflect'
```
- Manifesto generation and Assets (`public/assets` copy to `dist` for production build)
```
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
...
  plugins: [
...
    new CopyWebpackPlugin([
      { from : 'public/assets', to : 'assets'}
    ]),
    new ManifestPlugin()
  ],
```

## Getting started
Install dependencies
```
npm i
```
Then run dev script
```
npm run dev
```
Open `localhost:3000`
## Build
```
npm run build
```
Cleans existing `dist` folder while linting `src` folder. Then sets environment to production and compiles into `dist`.


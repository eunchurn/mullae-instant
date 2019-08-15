import gulp from 'gulp';
import Browser from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config.babel';

const webpackConfig = config({ env: 'dev' });

const browser = Browser.create();
const bundler = webpack(webpackConfig);

const dev = () => {
  const serverConfig = {
    server: 'dist',
    port: 3100,
    ui: { port: 3101 },
    open: false,
    middleware: [
      webpackDevMiddleware(bundler, {
        /* options */
      }),
      webpackHotMiddleware(bundler),
    ],
  };

  browser.init(serverConfig);

  gulp.watch(['src/**/*.js','build-utils/**.*.js', 'webpack.config.babel.js']).on('change', () => browser.reload());
};

export default dev;

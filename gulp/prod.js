import webpack from 'webpack';
import config from '../webpack.config.babel';

const configProd = config({ env: 'dev' });

const prod = () => {
  return new Promise(resolve =>
    webpack(configProd, (err, stats) => {
      if (err) console.log('Webpack', err);
      console.log(stats.toString());
      resolve();
    }),
  );
};

export default prod;

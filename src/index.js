// import 'react-app-polyfill/ie9'; // For IE 9-11 support
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import Main from '@components/Main';
import AppProvider from '@components/Context';

ReactDOM.render(<AppProvider><Main /></AppProvider>, document.getElementById('root'));

// Webpack Hot Module Replacement API
// if (module.hot) module.hot.accept("./components/Main", () => render(Main));

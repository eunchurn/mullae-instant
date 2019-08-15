import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './styles/global-styles.scss';

import App from './App';
import reducer from './store/reducers/reducer';

const store = createStore(reducer);

const Win95 = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Win95;

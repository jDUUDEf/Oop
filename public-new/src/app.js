import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import config from './config/index';
import routes from './routes';
import db from './lib/db';

import '../node_modules/uikit/dist/css/uikit.css';
import '../node_modules/uikit/dist/css/components/progress.css';

import './assets/css/main.css';

import heroService from './services/heroService';

import rootReducer from './reducers/rootReducer';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const nextRootReducer = require('./reducers/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

function run() {
  ReactDOM.render(
    <Provider store={store}>
      {routes}
    </Provider>,
    document.getElementById('app')
  );
}

window.fbAsyncInit = () => {
  FB.init({
    appId: config.facebookAppId,
    cookie: true,
    xfbml: true,
    version: 'v2.5',
  });

  FB.getLoginStatus((res) => {
    if (res.status === 'connected') {
      heroService.me().then(run);
      window.data = {};
      db.ref.child('tableExperience').on('value', (data) => {
        window.data.tableExperience = data.val();
      });
      db.ref.child('skills').on('value', (data) => {
        window.data.skills = data.val();
      });
    } else run();
  });
};

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App list={window.proca_twitter_list} actionText={window.proca_action_text} actionUrl={window.location.toString()}/>
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

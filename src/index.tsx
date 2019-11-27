import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from "./ThemeProvider";
import {Provider} from "react-redux";
import store from "store";
import {initSocketCon, socket} from "./socket";
initSocketCon(socket, store);

ReactDOM.render(
  <ThemeProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

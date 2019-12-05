import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from 'ThemeProvider';
import store from "../store";
import {Provider} from "react-redux";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider>
      <Provider store={store}>
        <App/>
      </Provider>
    </ThemeProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

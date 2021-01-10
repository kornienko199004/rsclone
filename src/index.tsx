import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './components/app/App';
// @ts-ignore
import reducer from './store/reducers/reducer.ts';
// import store from './store';

// const initialState = {
//   value: 'some value',
// };

const initialState: { body: any[] } = {
  body: [{
    pageId: 0,
    pageLink: '',
    pagePath: [0],
    content: '',
    neighbors: [],
    nestedPages: [],
  }],
};

const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById('root'),
);

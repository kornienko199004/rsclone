import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './components/app/App';
import reducer from './store/reducers/reducer';

// const rsCloneService = new RSCloneService();

export interface IInitialState {
    isLoggedIn: boolean,
    notes: [],
    focusComponentPath: (string | number)[]
    userData: {
        username: string | null,
        email: string | null
    }
}

const initialState : IInitialState = {
  isLoggedIn: !!localStorage.getItem('auth-token'),
  userData: {
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
  },
  notes: [],
  focusComponentPath: [0],
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

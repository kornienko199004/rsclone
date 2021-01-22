import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './components/app/App';
import reducer from './store/reducers/reducer';

// const rsCloneService = new RSCloneService();

const initialState : {
    isLoggedIn: boolean,
    notes: [],
    focusComponentPath: (string | number)[]
    userData: {username: string, email: string}
} = {
  isLoggedIn: !!localStorage.getItem('auth-token'),
  userData: {
    username: '',
    email: '',
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

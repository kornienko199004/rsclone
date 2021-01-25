import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './components/app/App';
import reducer from './store/reducers/reducer';
import { IPage } from './models/notes.model';

// const rsCloneService = new RSCloneService();

const initialState : {
    isLoggedIn: boolean,
    notes: [],
    noteBody: IPage[],
    focusComponentPath: (string | number)[]
    userData: {username: string, email: string}
} = {
  isLoggedIn: !!localStorage.getItem('auth-token'),
  userData: {
    username: '',
    email: '',
  },
  notes: [],
  noteBody: [],
  focusComponentPath: [0],
};

const composedEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, initialState, composedEnhancer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById('root'),
);

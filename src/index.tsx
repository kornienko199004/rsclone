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

export interface IInitialState {
    isLoggedIn: boolean,
    notes: [],
    noteBody: IPage[],
    focusComponentPath?: { [k: string]: (string | number)[] },
    userData: {
        username: string | null,
        email: string | null,
    },
    shortcuts: string[],
    sidebarIsOpen: boolean
}

const initialState : IInitialState = {
  isLoggedIn: !!localStorage.getItem('auth-token'),
  userData: {
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
  },
  notes: [],
  noteBody: [],
  shortcuts: [],
  sidebarIsOpen: true,
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

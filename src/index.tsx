import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './components/app/App';
import reducer from './store/reducers/reducer';
import { INote, INotification, IPage } from './models/notes.model';

// const rsCloneService = new RSCloneService();

export interface IInitialState {
    isLoggedIn: boolean,
    notes: [],
    body: IPage[],
    currentNote: INote | null;
    focusComponentPath?: { [k: string]: (string | number)[] },
    userData: {
        username: string | null,
        email: string | null,
    },
    shortcuts: string[],
    sidebarIsOpen: boolean,
    rightSidebarIsOpen: boolean,
    isLoading: boolean;
    notification: INotification | null;
}

const initialState : IInitialState = {
  isLoggedIn: !!localStorage.getItem('auth-token'),
  userData: {
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
  },
  currentNote: null,
  notes: [],
  body: [],
  shortcuts: [],
  sidebarIsOpen: true,
  rightSidebarIsOpen: false,
  isLoading: false,
  notification: null,
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

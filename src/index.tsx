import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './components/app/App';
import reducer from './store/reducers/reducer';
// import RSCloneService from './services/RSClone.service';
// import store from './store';

// const initialState = {
//   value: 'some value',
// };

// const rsCloneService = new RSCloneService();

const initialState: { body: any[]; focusComponentPath: (string | number)[] } = {
  body: [{
    pageId: 0,
    pageLink: '',
    pagePath: [0],
    content: '',
    neighbors: [],
    nestedPages: [],
    textInputHeight: 24,
  }],
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
//
// const test = async () => {
//   const id = await rsCloneService.addNote({
//     title: 'aaaxxxxxxxxada',
//     body: {
//       dasdasdasdas: 'dsa222dadada',
//       dasddsadasasdasdas: 'dsa222dadadadasdas',
//     },
//   });
//
//   await rsCloneService.getNote(id).then((res) => console.log(res));
//   await rsCloneService.updateNote({
//     title: 'aaxxxaas2xad',
//     body: {
//       ndddada: 'dasdasdasd',
//       ddddaa: 'daadsdas',
//     },
//   }, id)
//     .then((res) => console.log(res));
//   await rsCloneService.getNote(id).then((res) => console.log(res));
//   await rsCloneService.getNoteByTitle('aaxxxaas2xad').then((res) => console.log(res));
//   await rsCloneService.getNotes().then((res) => console.log(res));
//   await rsCloneService.deleteNote(id).then((res) => console.log(res));
// };
// test();

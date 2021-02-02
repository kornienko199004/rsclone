/* eslint-disable no-case-declarations */
// @ts-ignore
// import { updateNoteByTitle } from '../utils';
// import shortid from 'shortid';
import {
  CHANGE_FOCUS_ELEMENT,
  UPDATE_NOTE_BODY,
  SET_CURRENT_NOTE,
  ADD_NOTE,
  USER_LOGGED_IN,
  // UPDATE_CONTENT_RECEIVED,
  // UPDATE_CONTENT,
  ADD_SHORTCUT,
  USER_LOGGED_OUT,
  GET_USER_DATA,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  OPEN_RIGHT_SIDEBAR, CLOSE_RIGHT_SIDEBAR, REMOVE_SHORTCUT, TOGGLE_LOADER,
} from '../actions/actions';
import { INote } from '../../models/notes.model';

function reducer(state: any, action: any) {
  // let notes: INote[];
  switch (action.type) {
    case CHANGE_FOCUS_ELEMENT:
      return { ...state, focusComponentPath: action.focusComponentPath };
    case UPDATE_NOTE_BODY:
      // const notes = updateNoteByTitle(state.notes, action.title, action.body);
      return {
        ...state,
        body: action.body,
        // notes,
        focusComponentPath: action.focusComponentPath,
      };
    // case UPDATE_CONTENT_RECEIVED:
    //   notes = updateNoteByTitle(
    //     state.notes, action.payload.title, action.payload.body, [],
    //   );
    //   return {
    //     ...state,
    //     body: action.body,
    //     notes,
    //     // pageLinks: action.pageLinks, title: noteTitle,
    //     focusComponentPath: action.focusComponentPath,
    //   };
    // case UPDATE_CONTENT:
    //   notes = updateNoteByTitle(
    //     state.notes, action.title, action.body, [],
    //   );
    //   return {
    //     ...state,
    //     body: action.body,
    //     notes,
    //     focusComponentPath: action.focusComponentPath,
    //   };
    case ADD_NOTE:
      const noteIndex = state.notes.findIndex((item: INote) => item.title === action.note.title);

      let updatedNotes: INote[] = [...state.notes];

      if (noteIndex > -1) {
        updatedNotes.splice(noteIndex, 1, action.note);
      } else {
        updatedNotes = [...updatedNotes, action.note];
      }
      return { ...state, notes: updatedNotes };
    case SET_CURRENT_NOTE:
      return { ...state, currentNote: action.note };
    case USER_LOGGED_IN:
      return { ...state, isLoggedIn: true, userData: action.userData };
    case USER_LOGGED_OUT:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case GET_USER_DATA:
      return { ...state, shortcuts: action.payload };
    case ADD_SHORTCUT:
      return { ...state, shortcuts: [...state.shortcuts, action.payload] };
    case REMOVE_SHORTCUT:
      return { ...state, shortcuts: action.payload };
    case OPEN_SIDEBAR:
      return { ...state, sidebarIsOpen: true };
    case CLOSE_SIDEBAR:
      return { ...state, sidebarIsOpen: false };
    case OPEN_RIGHT_SIDEBAR:
      return { ...state, rightSidebarIsOpen: action.payload };
    case CLOSE_RIGHT_SIDEBAR:
      return { ...state, rightSidebarIsOpen: action.payload };
    case TOGGLE_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export default reducer;

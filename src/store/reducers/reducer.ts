/* eslint-disable no-case-declarations */
// @ts-ignore
import { updateNoteByTitle } from '../utils';
import {
  CHANGE_FOCUS_ELEMENT,
  UPDATE_NOTE_BODY,
  ADD_NOTE, USER_LOGGED_IN,
  UPDATE_CONTENT_RECEIVED,
  UPDATE_CONTENT,
  USER_LOGGED_OUT,
} from '../actions/actions';
import { INote } from '../../models/notes.model';

function reducer(state: any, action: any) {
  let notes: INote[];
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
    case UPDATE_CONTENT_RECEIVED:
      notes = updateNoteByTitle(
        state.notes, action.payload.title, action.payload.body, [],
      );
      return {
        ...state,
        body: action.body,
        notes,
        // pageLinks: action.pageLinks, title: noteTitle,
        focusComponentPath: action.focusComponentPath,
      };
    case UPDATE_CONTENT:
      notes = updateNoteByTitle(
        state.notes, action.title, action.body, [],
      );
      return {
        ...state,
        body: action.body,
        notes,
        focusComponentPath: action.focusComponentPath,
      };
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.note] };
    case USER_LOGGED_IN:
      return { ...state, isLoggedIn: true, userData: action.userData };
    case USER_LOGGED_OUT:
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
}

export default reducer;

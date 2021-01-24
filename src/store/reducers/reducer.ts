/* eslint-disable no-case-declarations */
// @ts-ignore
import { updateNoteByTitle } from '../utils';
import {
  CHANGE_FOCUS_ELEMENT, UPDATE_NOTE_BODY, ADD_NOTE, USER_LOGGED_IN, USER_LOGGED_OUT,
} from '../actions/actions';

function reducer(state: any, action: any) {
  switch (action.type) {
    case CHANGE_FOCUS_ELEMENT:
      return { ...state, focusComponentPath: action.focusComponentPath };
    case UPDATE_NOTE_BODY:
      const notes = updateNoteByTitle(state.notes, action.title, action.body);
      return {
        ...state,
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

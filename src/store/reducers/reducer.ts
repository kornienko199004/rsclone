/* eslint-disable no-case-declarations */
// @ts-ignore
// import { updateNoteByTitle } from '../utils';
import {
  CHANGE_FOCUS_ELEMENT,
  UPDATE_NOTE_BODY,
  ADD_NOTE, USER_LOGGED_IN, SET_CURRENT_NOTE,
  // UPDATE_CONTENT_RECEIVED,
  // UPDATE_CONTENT,
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
    case 'USER_LOGGED_OUT':
      return { ...state, isLoggedIn: false };

    default:
      return state;
  }
}

export default reducer;

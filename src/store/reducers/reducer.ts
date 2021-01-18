/* eslint-disable no-case-declarations */
// @ts-ignore
import { updateNoteByTitle } from '../utils';
import { CHANGE_FOCUS_ELEMENT, UPDATE_NOTE_BODY, ADD_NOTE } from '../actions/actions';

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

    default:
      return state;
  }
}

export default reducer;

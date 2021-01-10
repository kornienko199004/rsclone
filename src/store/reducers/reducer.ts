// @ts-ignore
import { CHANGE_FOCUS_ELEMENT, ADD_NEIGHBOR } from '../actions/actions.ts';

function reducer(state: any, action: any) {
  switch (action.type) {
    case CHANGE_FOCUS_ELEMENT:
      return { ...state, focusComponentPath: action.focusComponentPath };
    case ADD_NEIGHBOR:
      return { ...state, body: action.body, focusComponentPath: action.focusComponentPath };

    default:
      return state;
  }
}

export default reducer;

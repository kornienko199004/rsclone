// @ts-ignore
import { CHANGE_FOCUS_ELEMENT, ADD_NEIGHBOR } from '../actions/actions';

function reducer(state: any, action: any) {
  switch (action.type) {
    case CHANGE_FOCUS_ELEMENT:
      return { ...state, focusComponentPath: action.focusComponentPath };
    case ADD_NEIGHBOR:
      return { ...state, body: action.body, focusComponentPath: action.focusComponentPath };
    case 'USER_LOGGED_IN':
      return { ...state, isLoggedIn: true };
    case 'USER_LOGGED_OUT':
      return { ...state, isLoggedIn: false };

    default:
      return state;
  }
}

export default reducer;

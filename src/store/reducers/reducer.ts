// @ts-ignore
import { ACTION_1, ACTION_2, ADD_NEIGHBOR } from '../actions/actions.ts';

function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_1:
      return { value: action.value };
    case ACTION_2:
      return { value: action.value_2 };
    case ADD_NEIGHBOR:
      return { body: action.body };

    default:
      return state;
  }
}

export default reducer;

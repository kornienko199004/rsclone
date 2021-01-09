// @ts-ignore
import { ACTION_1, ACTION_2 } from '../actions/actions.ts';

function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_1:
      return { value: action.value_1 };
    case ACTION_2:
      return { value: action.value_2 };

    default:
      return state;
  }
}

export default reducer;

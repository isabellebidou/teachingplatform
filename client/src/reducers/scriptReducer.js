import { FETCH_SCRIPTS} from '../actions/types';

export default function scriptReducer(state = [], action) {
  switch (action.type) {
    case FETCH_SCRIPTS:
      return action.payload;
    default:
      return state;
  }
}
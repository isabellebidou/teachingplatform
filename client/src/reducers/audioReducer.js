import { FETCH_USER_AUDIOS } from '../actions/types';

export default function audioReducer(state = [], action) {
  switch (action.type) {
    case FETCH_USER_AUDIOS:
      return action.payload;
    default:
      return state;
  }
}
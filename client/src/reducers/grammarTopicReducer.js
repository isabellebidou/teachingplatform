import { FETCH_USER_GRAMMAR_TOPICS } from '../actions/types';

export default function grammarTopicReducer(state = [], action) {
  switch (action.type) {
    case FETCH_USER_GRAMMAR_TOPICS:
      return action.payload;
    default:
      return state;
  }
}
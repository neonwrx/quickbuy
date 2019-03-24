import { DEFINE_LANGUAGE } from '../actions/types';

const INITIAL_STATE = {
  lang: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DEFINE_LANGUAGE:
      return { ...state, lang: action.lang };
    default:
      return state;
  }
}

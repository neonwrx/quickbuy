import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../actions/types';

const INITIAL_STATE = {
  items: [],
  pages: 0,
  success: false,
  loading: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        pages: action.payload.pages,
        success: action.payload.success,
        loading: false
      };
    case FETCH_DATA_ERROR:
      return { ...state, success: false, loading: false }
    default:
      return state;
  }
}

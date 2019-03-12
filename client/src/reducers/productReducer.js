import { ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, PRODUCT_ERROR } from '../actions/types';

const INITIAL_STATE = {
  success: true,
  message: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, success: true, message: 'Товар добавлен' };
    case EDIT_PRODUCT:
      return { ...state, success: true, message: 'Товар изменен' };
    case DELETE_PRODUCT:
      return { ...state, success: true, message: 'Товар удален' };
    case PRODUCT_ERROR:
      return { ...state, success: action.payload.success || false, message: action.payload.message || ''  };
    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import dataReducer from './dataReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';

export default combineReducers({
  session: sessionReducer,
  dataReducer,
  productReducer,
  userReducer,
});

import axios from 'axios';
import { sessionService } from 'redux-react-session';
import * as sessionApi from '../api/sessionApi';

import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
  AUTH_FAILED,
  SIGN_IN,
} from './types';

const url = 'http://localhost:8080';
// const url = 'https://quickbuy.store:8443';

export const fetchData = (page, category, orderBy, orderAsc, searchText) => async (dispatch) => {
  dispatch({ type: FETCH_DATA });
  const res = await axios.get(`${url}/items?page=${page}&category=${category}&orderBy=${orderBy}&orderAsc=${orderAsc}&searchText=${searchText}`);
  if (res.data.success) {
    dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
  } else {
    console.log('res.data', res.data);
    dispatch({ type: FETCH_DATA_ERROR, payload: res.data });
  }
}

export const addProduct = (data) => async (dispatch) => {
  await sessionService.loadSession()
    .then( async token => {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const res = await axios.post(`${url}/items/new`, {data}, config);
      if (res.data.success) {
        dispatch({ type: ADD_PRODUCT });
      } else {
        dispatch({ type: PRODUCT_ERROR, payload: res.data });
        console.log('err', res.data);
      }
    })
    .catch(err => console.log(err))
};

export const editProduct = (data, uId) => async (dispatch) => {
  await sessionService.loadSession()
    .then( async token => {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const res = await axios.put(`${url}/items/edit`, {data, uId}, config);
      if (res.data.success) {
        dispatch({ type: EDIT_PRODUCT });
      } else {
        dispatch({ type: PRODUCT_ERROR, payload: res.data });
        console.log('err', res.data);
      }
    })
    .catch(err => console.log(err))
};

export const deleteProduct = (uId) => async (dispatch) => {
  await sessionService.loadSession()
    .then( async token => {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const res = await axios.delete(`${url}/items/delete?uId=${uId}`, config);
      if (res.data.success) {
        dispatch({ type: DELETE_PRODUCT });
      } else {
        dispatch({ type: PRODUCT_ERROR, payload: res.data });
        console.log('err', res.data);
      }
    })
    .catch(err => console.log(err))
};

export const signin = (user, history) => async (dispatch) => {
  await axios.post(`${url}/account/signin`, user)
  .then((res) => {
    if (res.data.success) {
      const { name, rights, token } = res.data;
      const { email } = user;
      sessionService.saveSession(token)
      .then(() => {
        sessionService.saveUser({name, email, rights, token})
        .then(() => {
          dispatch({ type: SIGN_IN });
          history.push('/admin');
        }).catch(err => console.error(err));
      }).catch(err => console.error(err));
    } else {
      dispatch({ type: AUTH_FAILED, payload: res.data });
    }
  })
  .catch(err => {
    dispatch({ type: AUTH_FAILED, payload: err });
    console.error(err);
  });
};

export const signup = (user, history) => async (dispatch) => {
  await axios.post(`${url}/account/signup`, user)
  .then((res) => {
    // console.log(res.data);
    if (res.data.success) {
      sessionService.saveSession(res.data.token)
      .then(() => {
        const { rights } = res.data;
        const { email, name } = user;
        sessionService.saveUser({name, email, rights})
        .then(() => {
          dispatch({ type: SIGN_IN });
          history.push('/admin');
        }).catch(err => console.error(err));
      }).catch(err => console.error(err));
    } else {
      dispatch({ type: AUTH_FAILED, payload: res.data });
    }
  })
  .catch(err => {
    dispatch({ type: AUTH_FAILED, payload: err });
    console.error(err);
  });
};

export const logout = (history) => {
  return () => {
    return sessionApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      history.push('/signin');
    }).catch(err => {
      throw (err);
    });
  };
};

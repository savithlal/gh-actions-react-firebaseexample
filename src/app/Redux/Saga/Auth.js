/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import {
  put,
  call,
  takeEvery,
  takeLatest,
  select,
  cps,
} from 'redux-saga/effects';
import API from '../Config/URL';
import Caller from '../Config/Caller';
import ACTION_TYPES from '../Actions/ActionTypes';

export function* loginUser(action) {
  try {
    var postData = action.data;

    let response = yield call(Caller, 'POST', API.LOGIN_USER, postData);

    yield put({
      type: ACTION_TYPES.LOGIN_RESPONSE,
      payload: response,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ACTION_TYPES.LOGIN_ERROR,
      payload: err,
    });
  }
}

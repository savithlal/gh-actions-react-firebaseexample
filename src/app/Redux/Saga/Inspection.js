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
import INSPECTION_REDUCER_ACTION_TYPES from "../Constants/InspectionReducerConstants";

export function* allInspectionList(action) {
  try {
    var postData = action.data;

    let response = yield call(
      Caller,
      'POST',
      API.ALL_INSPECTION_LIST,
      postData,
    );

    yield put({
      type: ACTION_TYPES.ALL_INSPECTION_LIST_RESPONSE,
      payload: response.data,
    });
  } catch (err) {
    console.log('err' + err);
    yield put({
      type: ACTION_TYPES.ALL_INSPECTION_LIST_ERROR,
      payload: err,
    });
  }
}

/**
 * getInspectionDetails(): Performs the redux operations on receiving 
 * reducer action GET_INSPECTION_DETAILS_RESPONSE
 * Performs API call and saves data to redux
 * @param {*} action 
 * @author Vivek PS
 */
export function* getInspectionDetails(action) {
  try {
    var postData = action.data;
    let response = yield call(
      Caller,
      'POST',
      API.GET_INSPECTION_DETAILS,
      postData,
    );
    yield put({
      type: INSPECTION_REDUCER_ACTION_TYPES.GET_INSPECTION_DETAILS_RESPONSE,
      payload: response.data,
    });
  } catch (err) {
    console.log('err' + err);
    yield put({
      type: INSPECTION_REDUCER_ACTION_TYPES.GET_INSPECTION_DETAILS_ERROR,
      payload: err,
    });
  }
}

/**
 * fetchDateBasedInspectionList(): Performs the redux operations on receiving 
 * reducer action DATE_BASED_INSPECTION_LIST_REQUEST
 * Performs API call and saves data to redux
 * @param {*} action 
 * @author Vivek PS
 */
export function* fetchDateBasedInspectionList(action) {
  try {
    var postData = action.data;
    let response = yield call(
      Caller,
      'POST',
      API.DATE_BASED_INSPECTION_LIST,
      postData,
    );
    yield put({
      type: INSPECTION_REDUCER_ACTION_TYPES.DATE_BASED_INSPECTION_LIST_RESPONSE,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: INSPECTION_REDUCER_ACTION_TYPES.DATE_BASED_INSPECTION_LIST_ERROR,
      payload: err,
    });
  }
}

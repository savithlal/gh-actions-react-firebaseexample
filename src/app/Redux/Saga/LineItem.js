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
import LINEITEM_REDUX_ACTION_TYPES from '../Constants/LineReducerConstants';
export function* getLineItem(action) {
  try {
    var postData = action.data;
    let response = yield call(Caller, 'POST', API.GET_LINE_ITEM, postData);

    yield put({
      type: ACTION_TYPES.GET_LINEITEM_RESPONSE,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: ACTION_TYPES.GET_LINEITEM_ERROR,
      payload: err,
    });
  }
}

export function* getLineLinputControls(action) {
  try {
    var postData = action.data;
    let response = yield call(
      Caller,
      'POST',
      API.GET_LINEINPUT_CONTROLS,
      postData,
    );

    yield put({
      type: LINEITEM_REDUX_ACTION_TYPES.GET_LINEINPUT_CONTROLS_RESPONSE,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: LINEITEM_REDUX_ACTION_TYPES.GET_LINEINPUT_CONTROLS_ERROR,
      payload: err,
    });
  }
}

export function* setImageVideo(action) {
  try {
    var postData = action.data;

    //let response = yield call(Caller, 'POST', API.IMAGE_VIDEO, postData);

    yield put({
      type: ACTION_TYPES.POST_IMAGEVIDEO_LINEITEM_RESPONSE,
      payload: postData,
    });
  } catch (err) {
    console.log('errrrr' + err);
    yield put({
      type: ACTION_TYPES.POST_IMAGEVIDEO_LINEITEM_ERROR,
      payload: err,
    });
  }
}
export function* setVideo(action) {
  try {
    var postData = action.data;

    //let response = yield call(Caller, 'POST', API.IMAGE_VIDEO, postData);

    yield put({
      type: ACTION_TYPES.POST_VIDEO_LINEITEM_RESPONSE,
      payload: postData,
    });
  } catch (err) {
    yield put({
      type: ACTION_TYPES.POST_VIDEO_LINEITEM_ERROR,
      payload: err,
    });
  }
}
export function* getInspectionData(action) {
  try {
    var postData = action.data;
    let response = yield call(
      Caller,
      'POST',
      API.GET_INSPECTION_DATA,
      postData,
    );

    yield put({
      type: LINEITEM_REDUX_ACTION_TYPES.GET_INSPECTION_DATA_RESPONSE,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: LINEITEM_REDUX_ACTION_TYPES.GET_INSPECTION_DATA_ERROR,
      payload: err,
    });
  }
}
export function* storeLineLinputControls(action) {
  try {
    var postData = action.data;
    let response = yield call(
      Caller,
      'POST',
      API.STORE_LINE_INPUT_CONTROLS,
      postData,
    );

    yield put({
      type: LINEITEM_REDUX_ACTION_TYPES.STORE_LINEINPUT_CONTROLS_RESPONSE,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: LINEITEM_REDUX_ACTION_TYPES.STORE_LINEINPUT_CONTROLS_ERROR,
      payload: err,
    });
  }
}

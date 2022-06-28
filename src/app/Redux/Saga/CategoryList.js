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

import Caller from '../Config/Caller';
import API from '../Config/URL';
import CATEGORY_REDUX_ACTION_TYPES from '../Constants/CategoryListReducerConstants';

/**
 * fetchUpdatedCategoryList(): Fetches the category list from the backend and updates the redux state
 * @param {*} action 
 * @author Vivek PS
 */
export function* fetchUpdatedCategoryList(action) {
    try {
        var postData = action.payload;
        let response = yield call(
            Caller,
            'POST',
            API.GET_CATEGORY_LIST,
            postData,
        );
        yield put({
            type: CATEGORY_REDUX_ACTION_TYPES.UPDATE_CATEGORY_LIST_RESPONSE,
            payload: response.data.data,
        });
    } catch (err) {
        console.log('err ' + err);
        yield put({
            type: CATEGORY_REDUX_ACTION_TYPES.UPDATE_CATEGORY_LIST_ERROR,
            payload: err,
        });
    }
}
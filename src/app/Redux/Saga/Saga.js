import {call, takeEvery, put, takeLatest} from 'redux-saga/effects';
import ACTION_TYPES from '../Actions/ActionTypes';
import {loginUser} from './Auth';
import {
  getLineItem,
  setImageVideo,
  setVideo,
  getLineLinputControls,
  getInspectionData,
  storeLineLinputControls,
} from './LineItem';
import {
  allInspectionList,
  fetchDateBasedInspectionList,
  getInspectionDetails,
} from './Inspection';
import INSPECTION_REDUCER_ACTION_TYPES from '../Constants/InspectionReducerConstants';
import CATEGORY_REDUX_ACTION_TYPES from '../Constants/CategoryListReducerConstants';
import LINEITEM_REDUX_ACTION_TYPES from '../Constants/LineReducerConstants';
import {fetchUpdatedCategoryList} from './CategoryList';

export default function* rootSaga() {
  //auth
  yield takeLatest(ACTION_TYPES.LOGIN_REQUEST, loginUser);
  //line item
  yield takeLatest(ACTION_TYPES.GET_LINEITEM_REQUEST, getLineItem);
  yield takeLatest(
    LINEITEM_REDUX_ACTION_TYPES.GET_LINEINPUT_CONTROLS_REQUEST,
    getLineLinputControls,
  );
  yield takeLatest(
    LINEITEM_REDUX_ACTION_TYPES.GET_INSPECTION_DATA_REQUEST,
    getInspectionData,
  );
  yield takeLatest(
    LINEITEM_REDUX_ACTION_TYPES.STORE_LINEINPUT_CONTROLS_REQUEST,
    storeLineLinputControls,
  );
  yield takeLatest(
    ACTION_TYPES.POST_IMAGEVIDEO_LINEITEM_REQUEST,
    setImageVideo,
  );
  yield takeLatest(ACTION_TYPES.POST_VIDEO_LINEITEM_REQUEST, setVideo);
  yield takeLatest(ACTION_TYPES.ALL_INSPECTION_LIST_REQUEST, allInspectionList);
  yield takeLatest(
    INSPECTION_REDUCER_ACTION_TYPES.DATE_BASED_INSPECTION_LIST_REQUEST,
    fetchDateBasedInspectionList,
  );
  yield takeLatest(
    INSPECTION_REDUCER_ACTION_TYPES.GET_INSPECTION_DETAILS_REQUEST,
    getInspectionDetails,
  );
  yield takeLatest(
    CATEGORY_REDUX_ACTION_TYPES.UPDATE_CATEGORY_LIST_REQUEST,
    fetchUpdatedCategoryList,
  );
}

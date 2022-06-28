import ACTION_TYPES from './ActionTypes';
import INSPECTION_REDUCER_ACTION_TYPES from '../Constants/InspectionReducerConstants';

const getinspectionListView = data => {
  console.log(data);
  return {
    type: ACTION_TYPES.ALL_INSPECTION_LIST_REQUEST,
    data,
  };
};
const getinspectionListViewClear = () => {
  return {
    type: ACTION_TYPES.ALL_INSPECTION_LIST_CLEAR,
  };
};
/**
 * getDateBasedInspectionList(): Gets inspection list corresponding to provided date
 * @param {*} data
 * @returns
 * @author Vivek PS
 */
const getDateBasedInspectionList = data => {
  return {
    type: INSPECTION_REDUCER_ACTION_TYPES.DATE_BASED_INSPECTION_LIST_REQUEST,
    data,
  };
};

/**
 * getinspectionDetails(): Reducer action for geting inspection details
 * @param {*} data
 * @returns
 * @author Vivek PS
 */
const getinspectionDetails = data => {
  return {
    type: INSPECTION_REDUCER_ACTION_TYPES.GET_INSPECTION_DETAILS_REQUEST,
    data,
  };
};

const getinspectionDetailsClear = () => {
  return {
    type: INSPECTION_REDUCER_ACTION_TYPES.GET_INSPECTION_DETAILS_CLEAR,
  };
};

export {
  getinspectionListView,
  getinspectionListViewClear,
  getinspectionDetails,
  getinspectionDetailsClear,
  getDateBasedInspectionList,
};

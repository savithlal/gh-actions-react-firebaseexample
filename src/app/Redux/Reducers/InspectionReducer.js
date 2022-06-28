import ACTION_TYPES from '../Actions/ActionTypes';
import INSPECTION_REDUCER_ACTION_TYPES from '../Constants/InspectionReducerConstants';
const initialState = '';

export default (state = initialState, {type, payload}) => {
  switch (type) {
    // USER_RATING
    case ACTION_TYPES.ALL_INSPECTION_LIST_RESPONSE:
      return {...state, allInspectionListRes: payload};

    case ACTION_TYPES.ALL_INSPECTION_LIST_CLEAR:
      return {...state, allInspectionListRes: ''};

    case ACTION_TYPES.ALL_INSPECTION_LIST_ERROR:
      return {...state, allInspectionListRes: payload};

    case INSPECTION_REDUCER_ACTION_TYPES.GET_INSPECTION_DETAILS_RESPONSE:
      return {...state, inspectionDetailsRes: payload};

    case INSPECTION_REDUCER_ACTION_TYPES.GET_INSPECTION_DETAILS_ERROR:
      return {...state, inspectionDetailsRes: payload};

    case INSPECTION_REDUCER_ACTION_TYPES.GET_INSPECTION_DETAILS_CLEAR:
      return {...state, inspectionDetailsRes: ''};

    case INSPECTION_REDUCER_ACTION_TYPES.DATE_BASED_INSPECTION_LIST_RESPONSE:
      return {...state, landingScreenInspectionList: payload};

    case INSPECTION_REDUCER_ACTION_TYPES.DATE_BASED_INSPECTION_LIST_ERROR:
      return {...state, landingScreenInspectionList: payload};

    case INSPECTION_REDUCER_ACTION_TYPES.DATE_BASED_INSPECTION_LIST_CLEAR:
      return {...state, landingScreenInspectionList: ''};

    default:
      return state;
  }
};

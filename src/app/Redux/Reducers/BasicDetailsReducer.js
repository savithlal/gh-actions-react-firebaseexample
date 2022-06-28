import {Theme} from '../../Styles/Theme';
import BASIC_DETAILS_REDUX_ACTION_TYPES from '../Constants/BasicDetailsReducerConstants';

const ACTION_TYPES = BASIC_DETAILS_REDUX_ACTION_TYPES;
const initialState = {};

/**
 * sharedReducer(): Handles the rexux operations for states shared across the app
 * @param {*} state
 * @param {*} action
 * @returns
 * @author Charles
 */
const BasicDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.STORE_BASIC_PAGE_DETAILS:
      let arr = state.storeBasicPageDetailsRes;
      let getData = action.payload;
      if (arr) {
        arr[getData.name] = getData.value;
      } else {
        arr = {[getData.name]: getData.value};
      }
      console.log(arr);
      return {
        ...state,
        storeBasicPageDetailsRes: arr,
      };
    default:
      return state;
  }
};

export default BasicDetailsReducer;

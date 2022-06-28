import CATEGORY_REDUX_ACTION_TYPES from '../Constants/CategoryListReducerConstants';

const ACTION_TYPES = CATEGORY_REDUX_ACTION_TYPES;
const initialState = {};

/**
 * categoryListReducer(): Handles the rexux operations for category lists
 * @param {*} state
 * @param {*} action
 * @returns
 * @author Vivek PS
 */
const categoryListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        categoryList: action.payload,
      };

    case ACTION_TYPES.UPDATE_CATEGORY_LIST_RESPONSE:
      return {
        ...state,
        categoryList: action.payload,
      };

    case ACTION_TYPES.UPDATE_CATEGORY_LIST_ERROR:
      return {
        ...state,
        categoryList: action.payload,
      };

    default:
      return state;
  }
};

export default categoryListReducer;

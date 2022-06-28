import SHARED_REDUX_ACTION_TYPES from '../Constants/SharedReducerConstants';

const ACTION_TYPES = SHARED_REDUX_ACTION_TYPES;
/**
 * changeStatusBarColor(): Updates the color of statusbar
 * @param {*} payload
 * @returns
 * @author Vivek PS
 */
export const changeStatusBarColor = payload => {
  return {
    type: ACTION_TYPES.CHANGE_STATUSBAR_COLOR,
    payload,
  };
};

/**
 * changeStatusBarStyle(): Changes the color of statusbar
 * available STYLES are 'default', 'dark-content', 'light-content'
 * @param {*} payload
 * @returns
 * @author Vivek PS
 */
export const changeStatusBarStyle = payload => {
  return {
    type: ACTION_TYPES.CHANGE_STATUSBAR_STYLE,
    payload,
  };
};

/**
 * storeBasicDetails(): store basic details
 *
 * @param {*} payload
 * @returns
 * @author Charles
 */
export const storeBasicPageDetails = payload => {
  return {
    type: ACTION_TYPES.STORE_BASIC_PAGE_DETAILS,
    payload,
  };
};

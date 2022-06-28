import BASIC_DETAILS_REDUX_ACTION_TYPES from '../Constants/BasicDetailsReducerConstants';

const ACTION_TYPES = BASIC_DETAILS_REDUX_ACTION_TYPES;

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

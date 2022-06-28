import CATEGORY_REDUX_ACTION_TYPES from '../Constants/CategoryListReducerConstants';

const ACTION_TYPES = CATEGORY_REDUX_ACTION_TYPES;

/**
 * updateCategoryList(): Updates the category list data
 * @param {*} payload
 * @returns
 * @author Vivek PS
 */
export const updateCategoryList = payload => {
    return {
        type: ACTION_TYPES.UPDATE_CATEGORY_LIST_REQUEST,
        payload,
    };
};


import {
    ADD_IMAGES_TO_LINE_ITEM,
    DELETE_IMAGES_FROM_LINE_ITEM,
    UPDATE_LINE_ITEM_IMAGES,
    TEST
} from '../Constants/LineItemReducerConstants';

/**
 * addImagesToLineItem(): Add an image to a particular line item
 * @param {*} lineItem 
 * @param {*} image 
 * @returns 
 */
export const addImagesToLineItem1 = (lineItem, image) => (dispatch) => {
    dispatch({
        type: ADD_IMAGES_TO_LINE_ITEM,
        payload: {
            lineItem: lineItem,
            image: image
        },
    });
};

export const addImagesToLineItem = (data) => {
   
    return {
      type: ADD_IMAGES_TO_LINE_ITEM,
      payload: {
        lineItem: data.lineItem,
        image: data.image
    },
    };
  };
  
export const Test = (data) => {
    return {
      type: TEST,
      data,
    };
  };
/**
 * deleteImagesFromLineItem(): Deletes selected images from a particular line item
 * @param {*} lineItem 
 * @param {*} imageIndexArray: Contains index of images to be deleted
 * @returns 
 */
export const deleteImagesFromLineItem = (lineItem, imageIndexArray) => (dispatch) => {
    dispatch({
        type: DELETE_IMAGES_FROM_LINE_ITEM,
        payload: {
            lineItem: lineItem,
            imageIndexArray: imageIndexArray
        },
    });
};

/**
 * updateLineItemImages(): Updates the images of a particular line item
 * @param {*} lineItem 
 * @param {*} imageArray 
 * @returns 
 */
export const updateLineItemImages = (lineItem, imageArray) => (dispatch) => {
    dispatch({
        type: UPDATE_LINE_ITEM_IMAGES,
        payload: {
            lineItem: lineItem,
            imageArray: imageArray
        },
    });
};
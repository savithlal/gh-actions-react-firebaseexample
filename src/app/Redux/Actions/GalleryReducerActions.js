import {
    ADD_IMAGES_TO_GALLERY,
    DELETE_IMAGES_FROM_GALLERY,
    UPDATE_GALLERY_IMAGES,
} from '../Constants/GalleryReducerConstants';

/**
 * addImages(): Add images to gallery independent of lineItems
 * @param {*} image 
 * @returns 
 */
export const addImages = (image) => (dispatch) => {
    dispatch({
        type: ADD_IMAGES_TO_GALLERY,
        payload: image,
    });
};

/**
 * deleteImages(): Deletes selected images from the gallery
 * @param {*} imageIndexArray: Contains index of images to be deleted
 * @returns 
 */
export const deleteImages = (imageIndexArray) => (dispatch) => {
    dispatch({
        type: DELETE_IMAGES_FROM_GALLERY,
        payload: imageIndexArray,
    });
};

/**
 * updateImages(): Updates the images in the gallery
 * @param {*} imageArray 
 * @returns 
 */
export const updateImages = (imageArray) => (dispatch) => {
    dispatch({
        type: UPDATE_GALLERY_IMAGES,
        payload: imageArray,
    });
};
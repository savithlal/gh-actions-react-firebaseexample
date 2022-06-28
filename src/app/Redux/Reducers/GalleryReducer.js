import {
    ADD_IMAGES_TO_GALLERY,
    DELETE_IMAGES_FROM_GALLERY,
    UPDATE_GALLERY_IMAGES,
} from '../Constants/GalleryReducerConstants';

const initialState = {
    capturedImages: [],
}

/**
 * galleryReducer(): Handles the rexux operations for galley
 * @param {*} state 
 * @param {*} action
 * @returns 
 */
const galleryReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_IMAGES_TO_GALLERY:
            return {
                ...state,
                capturedImages: [...state.capturedImages, action.payload]
            };

        case DELETE_IMAGES_FROM_GALLERY:
            return {
                ...state,
                capturedImages: action.payload
            };

        case UPDATE_GALLERY_IMAGES:
            return {
                ...state,
                capturedImages: action.payload
            };

        default:
            return state;
    }
}

export default galleryReducer;
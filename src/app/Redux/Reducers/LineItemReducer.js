import {
  ADD_IMAGES_TO_LINE_ITEM,
  DELETE_IMAGES_FROM_LINE_ITEM,
  UPDATE_LINE_ITEM_IMAGES,
  TEST,
  // } from '../Constants/lineItemReducerConstants';
} from '../Constants/LineItemReducerConstants';
import ACTION_TYPES from '../Actions/ActionTypes';
import LINEITEM_REDUX_ACTION_TYPES from '../Constants/LineReducerConstants';
const initialState = {
  lineItems: {
    Driveway: {
      capturedImages: [],
    },
    Walks: {
      capturedImages: [],
    },
    Steps: {
      capturedImages: [],
    },
    Porch: {
      capturedImages: [],
    },
  },
};

/**
 * lineItemReducer(): Handles the redux operations for line items
 * @param {*} state
 * @param {*} action
 * @returns
 */
const LineItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGES_TO_LINE_ITEM:
      let capturedImagesTemp = state.lineItems[action.payload.lineItem];
      capturedImagesTemp.capturedImages.push(action.payload.image);
      return {
        ...state,
        lineItems: {
          ...state.lineItems,
          [action.payload.lineItem]: {
            ...state.lineItems[action.payload.lineItem],
            ...capturedImagesTemp,
          },
        },
      };

    case DELETE_IMAGES_FROM_LINE_ITEM:
      let capturedImagesTempArray =
        state.lineItems[action.payload.lineItem]?.capturedImages;
      let imageIndexArrayTemp = action.payload.imageIndexArray;
      imageIndexArrayTemp.sort((a, b) => b - a);
      imageIndexArrayTemp.map(imageIndex => {
        capturedImagesTempArray.splice(imageIndex, 1);
      });
      return {
        ...state,
        lineItems: {
          ...state.lineItems,
          [action.payload.lineItem]: {
            ...state.lineItems[action.payload.lineItem],
            capturedImages: capturedImagesTempArray,
          },
        },
      };

    case UPDATE_LINE_ITEM_IMAGES:
      return {
        ...state,
        // lineItems: action.payload
      };

    case ACTION_TYPES.GET_LINEITEM_RESPONSE:
      return {
        ...state,
        getLineItemRes: action.payload,
      };
    case ACTION_TYPES.GET_LINEITEM_ERROR:
      return {
        ...state,
        getLineItemRes: action.payload,
      };
    case LINEITEM_REDUX_ACTION_TYPES.GET_LINEINPUT_CONTROLS_RESPONSE:
      return {
        ...state,
        getLineInputControlRes: action.payload,
      };
    case LINEITEM_REDUX_ACTION_TYPES.GET_LINEINPUT_CONTROLS_ERROR:
      return {
        ...state,
        getLineInputControlRes: action.payload,
      };
    case LINEITEM_REDUX_ACTION_TYPES.GET_LINEINPUT_CONTROLS_CLEAR:
      return {
        ...state,
        getLineInputControlRes: '',
      };
    case ACTION_TYPES.POST_IMAGEVIDEO_LINEITEM_RESPONSE:
      return {...state, postImageVideoRes: action.payload};

    case ACTION_TYPES.POST_IMAGEVIDEO_LINEITEM_ERROR:
      return {...state, postImageVideoRes: action.payload};

    case ACTION_TYPES.POST_IMAGEVIDEO_LINEITEM_CLEAR:
      return {...state, postImageVideoRes: ''};

    case ACTION_TYPES.POST_VIDEO_LINEITEM_RESPONSE:
      return {...state, postVideoRes: action.payload};

    case ACTION_TYPES.POST_VIDEO_LINEITEM_ERROR:
      return {...state, postVideoRes: action.payload};

    case ACTION_TYPES.POST_VIDEO_LINEITEM_CLEAR:
      return {...state, postVideoRes: ''};
    //get inspection Data
    case LINEITEM_REDUX_ACTION_TYPES.GET_INSPECTION_DATA_RESPONSE:
      return {
        ...state,
        getInspectionDataRes: action.payload,
      };
    case LINEITEM_REDUX_ACTION_TYPES.GET_INSPECTION_DATA_ERROR:
      return {
        ...state,
        getInspectionDataRes: action.payload,
      };
    case LINEITEM_REDUX_ACTION_TYPES.GET_INSPECTION_DATA_CLEAR:
      return {
        ...state,
        getInspectionDataRes: '',
      };
    //store inspection line control
    case LINEITEM_REDUX_ACTION_TYPES.STORE_LINEINPUT_CONTROLS_RESPONSE:
      return {
        ...state,
        storeLineInputControlRes: action.payload,
      };
    case LINEITEM_REDUX_ACTION_TYPES.STORE_LINEINPUT_CONTROLS_ERROR:
      return {
        ...state,
        storeLineInputControlRes: action.payload,
      };
    case LINEITEM_REDUX_ACTION_TYPES.STORE_LINEINPUT_CONTROLS_CLEAR:
      return {
        ...state,
        storeLineInputControlRes: '',
      };
    default:
      return state;
  }
};

export default LineItemReducer;

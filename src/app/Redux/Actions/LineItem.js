import LINEITEM_REDUX_ACTION_TYPES from '../Constants/LineReducerConstants';
const ACTION_TYPES = LINEITEM_REDUX_ACTION_TYPES;

const getLineItem = data => {
  return {
    type: ACTION_TYPES.GET_LINEITEM_REQUEST,
    data,
  };
};
const getLineInputControls = data => {
  return {
    type: ACTION_TYPES.GET_LINEINPUT_CONTROLS_REQUEST,
    data,
  };
};
const getLineInputControlsClear = () => {
  return {
    type: ACTION_TYPES.GET_LINEINPUT_CONTROLS_CLEAR,
  };
};
const postImageVideoLineItem = data => {
  return {
    type: ACTION_TYPES.POST_IMAGEVIDEO_LINEITEM_REQUEST,
    data,
  };
};
const postImageVideoLineItemClear = () => {
  return {
    type: ACTION_TYPES.POST_IMAGEVIDEO_LINEITEM_CLEAR,
  };
};
const postVideoLineItem = data => {
  return {
    type: ACTION_TYPES.POST_VIDEO_LINEITEM_REQUEST,
    data,
  };
};
const postVideoLineItemClear = () => {
  return {
    type: ACTION_TYPES.POST_VIDEO_LINEITEM_CLEAR,
  };
};
const getInspectionData = data => {
  return {
    type: ACTION_TYPES.GET_INSPECTION_DATA_REQUEST,
    data,
  };
};
const getInspectionDataClear = () => {
  return {
    type: ACTION_TYPES.GET_INSPECTION_DATA_CLEAR,
  };
};
const storeLieInputControls = data => {
  return {
    type: ACTION_TYPES.STORE_LINEINPUT_CONTROLS_REQUEST,
    data,
  };
};
const storeLieInputControlsClear = () => {
  return {
    type: ACTION_TYPES.STORE_LINEINPUT_CONTROLS_CLEAR,
  };
};
export {
  getLineItem,
  getLineInputControls,
  getLineInputControlsClear,
  postImageVideoLineItem,
  postImageVideoLineItemClear,
  postVideoLineItem,
  postVideoLineItemClear,
  getInspectionData,
  getInspectionDataClear,
  storeLieInputControls,
  storeLieInputControlsClear,
};

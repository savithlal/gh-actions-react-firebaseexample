import INSPECTION_REDUX_ACTION_TYPES from '../Constants/InspectionsReducerConstants';
const ACTION_TYPES = INSPECTION_REDUX_ACTION_TYPES;
const getinspectionListView = data => {
  return {
    type: ACTION_TYPES.ALL_INSPECTION_LIST_REQUEST,
    data,
  };
};

export {getinspectionListView};

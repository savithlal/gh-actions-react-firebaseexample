import {Strings} from '../../Utilities/Strings';
const API = {
  BASE_URL: Strings.Is_Production
    ? 'https://palmtechdevelop.yourinspection.report/public/index.php/api/' //Live
    : 'https://palmtechdevelop.yourinspection.report/public/index.php/api/', //STAGING

  // Auth
  BASIC_INFO: 'init',
  LOGIN_USER: 'login',

  //IMAGE_VIDEO: 'get-inspection-list',
  IMAGE_VIDEO: 'upload-files',

  // Inspection
  ALL_INSPECTION_LIST: 'get-inspection-list-mobile',
  GET_INSPECTION_DETAILS: 'get-inspection-detail',
  DATE_BASED_INSPECTION_LIST: 'get-current-date-inspection-list-mobile',
  GET_LINE_ITEM: 'get-category-lines',
  // Category list
  GET_CATEGORY_LIST: 'get-inspection-categories',
  //FLASINGS
  GET_LINEINPUT_CONTROLS: 'get-line-input-controls',
  GET_INSPECTION_DATA: 'get-inspection-data',
  STORE_LINE_INPUT_CONTROLS: 'store-line-input-controls',
};

export default API;

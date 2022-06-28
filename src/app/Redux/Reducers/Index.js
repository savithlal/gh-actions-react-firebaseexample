import {combineReducers} from 'redux';
import galleryReducer from './GalleryReducer';
import LineItemReducer from './LineItemReducer';
import AuthReducer from './AuthReducer';
import SharedReducer from './SharedReducer';
import inspectionReducer from './InspectionReducer';
import categoryListReducer from './CategoryListReducer';
import BasicDetailsReducer from './BasicDetailsReducer';
export default combineReducers({
  galleryReducer,
  LineItemReducer,
  AuthReducer,
  SharedReducer,
  inspectionReducer,
  categoryListReducer,
  BasicDetailsReducer,
});

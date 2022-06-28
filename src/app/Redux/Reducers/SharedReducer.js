import {Theme} from '../../Styles/Theme';
import SHARED_REDUX_ACTION_TYPES from '../Constants/SharedReducerConstants';

const ACTION_TYPES = SHARED_REDUX_ACTION_TYPES;
const initialState = {
  statusbarColor: Theme.White,
  statusbarStyle: 'dark-content',
};

/**
 * sharedReducer(): Handles the rexux operations for states shared across the app
 * @param {*} state
 * @param {*} action
 * @returns
 * @author Vivek PS
 */
const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_STATUSBAR_COLOR:
      return {
        ...state,
        statusbarColor: action.payload,
      };

    case ACTION_TYPES.CHANGE_STATUSBAR_STYLE:
      return {
        ...state,
        statusbarStyle: action.payload,
      };
    case ACTION_TYPES.STORE_BASIC_PAGE_DETAILS:
      let arr = state.storeBasicPageDetailsRes;
      let getData = action.payload;
      console.log(getData);
      // if (arr.hasOwnProperty(getData.name)) {
      //   console.log('get the data');
      //   arr[getData.name] = getData.value;
      // } else {
      // console.log('no the data');
      arr[getData.name] = getData.value;
      // }

      // var keys = Object.keys(arr);

      // console.log(keys);
      // let obj = arr.some((o, i) => {
      //   console.log('new' + o.hasOwnProperty(getData.name) + i);
      //   if (o.hasOwnProperty(getData.name)) {
      //     console.log('true' + 0);
      //     //  arr.splice(i, 1);
      //     console.log('after splice' + JSON.stringify(arr));
      //     arr[i] = {[getData.name]: getData.value};
      //     return true;
      //   } else {
      //     console.log('else' + i);
      //     arr[i + 1] = {[getData.name]: getData.value};
      //     return true;
      //   }
      // });
      // if (!obj) {
      //   console.log('obj' + i);
      //   arr = [{[getData.name]: getData.value}];
      // }

      console.log(arr);

      return {
        ...state,
        //storeBasicPageDetailsRes: {},
        storeBasicPageDetailsRes: arr,
      };
    default:
      return state;
  }
};

export default sharedReducer;

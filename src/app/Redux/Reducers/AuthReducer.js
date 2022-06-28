import ACTION_TYPES from '../Actions/ActionTypes';
const initialState = {};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.LOGIN_RESPONSE:
      return {loginRes: payload};

    case ACTION_TYPES.LOGIN_ERROR:
      return {loginRes: payload};

    case ACTION_TYPES.LOGIN_CLEAR:
      return {loginRes: ''};

    default:
      return state;
  }
};

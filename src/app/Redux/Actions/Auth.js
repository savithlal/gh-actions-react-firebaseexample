import AUTH_REDUX_ACTION_TYPES from '../Constants/AuthReducerConstants';
/**
 * Auth ACTIONS
 * @author Charles
 **/
const ACTION_TYPES = AUTH_REDUX_ACTION_TYPES;
const loginUser = data => {
  return {
    type: ACTION_TYPES.LOGIN_REQUEST,
    data,
  };
};

const logoutUser = () => {
  return {
    type: ACTION_TYPES.LOGIN_CLEAR,
  };
};

export {loginUser, logoutUser};

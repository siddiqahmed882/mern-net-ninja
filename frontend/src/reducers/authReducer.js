import authActions from '../actions/AuthActions';

const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.LOGIN:
      return { ...state, user: action.payload };
    case authActions.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;

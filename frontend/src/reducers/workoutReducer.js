import workoutActions from '../actions/workoutActions';

const workoutReducer = (state, action) => {
  switch (action.type) {
    case workoutActions.SET_WORKOUTS:
      return { ...state, workouts: action.payload };
    case workoutActions.ADD_WORKOUT:
      return { ...state, workouts: [action.payload, ...state.workouts] };
    case workoutActions.DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default workoutReducer;

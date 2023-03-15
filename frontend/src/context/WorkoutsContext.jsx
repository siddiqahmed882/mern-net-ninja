import { createContext, useReducer } from 'react';
import workoutReducer from '../reducers/workoutReducer';

export const WorkoutsContext = createContext();

const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};

export default WorkoutsContextProvider;

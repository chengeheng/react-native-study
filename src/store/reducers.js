import {combineReducers} from 'redux';

export const UPDATE_DATA = 'UPDATE_DATA';

const dataReducer = function(state = {}, action) {
  switch (action.type) {
    case UPDATE_DATA: {
      console.log(action);
      return {
        ...state,
        [action.stateId]: action.value,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  data: dataReducer,
});

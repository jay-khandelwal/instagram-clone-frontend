import * as ActionTypes from "../Actions/ActionTypes";
import { updateObject } from "../Utility";

const initialState ={
    directUsers:[],
}

const addDirect = (state, action) => {
  var arry = state.directUsers
  var index = arry.findIndex(obj => obj.id === action.data.id);
  if (index === -1){
      return updateObject(state, {
        directUsers: [action.data, ...state.directUsers]
      });
  }
  
  else{
      arry = arry.filter(obj => obj.id !== action.data.id)
      return updateObject(state, {
        directUsers: [action.data, ...arry]
      });
  }
};

const setDirect = (state, action) => {
    return updateObject(state, {
      directUsers: [...state.directUsers, ...action.data]
    });
}

const set2Direct = (state, action) => {
    return updateObject(state, {
      directUsers: action.data
    });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DIRECT:
      return addDirect(state, action);
    case ActionTypes.SET_DIRECT:
      return setDirect(state, action);
    case ActionTypes.SET2_DIRECT:
      return set2Direct(state, action);
    default:
      return state;
  }
};

export default reducer;
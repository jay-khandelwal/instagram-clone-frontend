import * as ActionTypes from "../Actions/ActionTypes";
import { updateObject } from "../Utility";

const initialState = {
  token: null,
  username: null,
  nerror:false,
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
  token: null,
  username: null,
  userId: null,
  profile_pic:null
  });
};


const changeUsername = (state, action) => {
    if (state.username !== action.username){
        const user = {'token':state.token, 'username':action.username}
        localStorage.setItem('user', JSON.stringify(user));
        return updateObject(state, {
                username:action.username
            })        
    }
    else{
        return state
    }
}

const nerror = (state, action) => {
    return updateObject(state, {
        nerror:true,
    })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case ActionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case ActionTypes.CHANGE_USERNAME:
      return changeUsername(state, action);
    case ActionTypes.CHANGE_NERROR:
      return nerror(state, action);
    default:
      return state;
  }
};

export default reducer;

import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { HOST_URL } from "../../Settings";


export const authSuccess = user => {
    return{
        type: ActionTypes.AUTH_SUCCESS,
        user
    }
}

export const changeUsername = username => {
    return{
        type: ActionTypes.CHANGE_USERNAME,
        username
    }
}

export const logout = (token) => {
    localStorage.removeItem('user');
    const url = `${HOST_URL}/rest-auth/logout/`
    axios.get(url,  {
        headers:{
            Authorization:`Token ${token}`
        }
    })
    .then(resp=>{
    })
    .catch (error=>{
    })
        
    return{
        type: ActionTypes.AUTH_LOGOUT
    }
}

export const nerror = () => {
    return{
        type:ActionTypes.CHANGE_NERROR
    }
}

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
      } else {
        dispatch(authSuccess(user));
      
      }
    }
  };

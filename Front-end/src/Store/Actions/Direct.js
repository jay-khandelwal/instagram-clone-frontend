import * as ActionTypes from './ActionTypes';

export const addDirect = data => {
  return {
    type: ActionTypes.ADD_DIRECT,
    data: data,
  };
};

export const setDirect = data => {
  return {
    type: ActionTypes.SET_DIRECT,
    data: data,
  };
};

export const set2Direct = data => {
  return {
    type: ActionTypes.SET2_DIRECT,
    data: data,
  };
};



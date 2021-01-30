import * as ActionTypes from "../Actions/ActionTypes";
import { updateObject } from "../Utility";

const initialState = {
  notifications: [],
  direct: [],
  maincount:0,
  directcount:0,
};


const addNotificationCount = (state, action) => {
  return updateObject(state, {
      maincount:action.maincount,
      reqrec:action.reqrec,
      reqsend:action.reqsend,
      directcount:action.directcount,
  });
};

const setMainCount = (state, action) => {
  return updateObject(state, {
      maincount:action.maincount,
  });
};

const setDirectCount = (state, action) => {
  return updateObject(state, {
      directcount:action.directcount,
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION_COUNT:
      return addNotificationCount(state, action);
    case ActionTypes.SET_MAIN_COUNT:
      return setMainCount(state, action);
    case ActionTypes.SET_DIRECT_COUNT:
      return setDirectCount(state, action);
    default:
      return state;
  }
};

export default reducer;
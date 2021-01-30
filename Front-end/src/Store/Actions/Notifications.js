import * as ActionTypes from './ActionTypes';

export const addNotificationCount = (data) => {
  return {
    type: ActionTypes.ADD_NOTIFICATION_COUNT,
    maincount:data.maincount,
    reqrec:data.reqrec,
    reqsend:data.reqsend,
    directcount:data.directcount,
  };
};

export const setMainCount = (data) => {
  return {
    type: ActionTypes.SET_MAIN_COUNT,
    maincount:data,
  };
};

export const setDirectCount = (data) => {
  return {
    type: ActionTypes.SET_DIRECT_COUNT,
    directcount:data,
  };
};


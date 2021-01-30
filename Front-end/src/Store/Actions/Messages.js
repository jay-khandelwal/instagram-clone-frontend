import * as ActionTypes from './ActionTypes';

export const addMessage = (mssg_data) => {
  return {
    type: ActionTypes.ADD_MESSAGE,
    message: mssg_data.message,
    sender:mssg_data.sender,
    timestamp:mssg_data.timestamp,
  };
};

export const setMessages = messages => {
  return {
    type: ActionTypes.SET_MESSAGES,
    messages: messages
  };
};

// old mssgs through pagination
export const oldMessages = messages => {
  return {
    type: ActionTypes.OLD_MESSAGES,
    messages: messages
  };
};

export const mloadT = () => {
  return {
    type: ActionTypes.MLOAD_T,
  };
};

export const mloadF = () => {
  return {
    type: ActionTypes.MLOAD_F,
  };
};


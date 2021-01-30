import * as ActionTypes from "../Actions/ActionTypes";
import { updateObject } from "../Utility";

const initialState = {
  messages: [],
  loading:false
};


const addMessage = (state, action) => {
  return updateObject(state, {
    messages: [...state.messages, {'content':action.message, 'sender':action.sender, 'timestamp':action.timestamp}]
  });
};

const setMessages = (state, action) => {
  return updateObject(state, {
        messages: action.messages.reverse()
  });
};

const oldMessages = (state, action) => {
  return updateObject(state, {
        messages: [...action.messages.reverse(), ...state.messages]
  });
};

const mloadT = (state, action) => {
  return updateObject(state, {
        loading: true
  });
};

const mloadF = (state, action) => {
  return updateObject(state, {
        loading: false
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      return addMessage(state, action);
    case ActionTypes.SET_MESSAGES:
      return setMessages(state, action);
    case ActionTypes.OLD_MESSAGES:
      return oldMessages(state, action);
    case ActionTypes.MLOAD_T:
      return mloadT(state, action);
    case ActionTypes.MLOAD_F:
      return mloadF(state, action);
    default:
      return state;
  }
};

export default reducer;

import * as ActionTypes from "../Actions/ActionTypes";
import { updateObject } from "../Utility";

const initialState ={
    feeds:[],
}

const setFeeds = (state, action) => {
    console.log('edited data :-',action.feeds)
  return updateObject(state, {
    feeds: action.feeds,
  });
};

const addFeeds = (state, action) => {
    console.log('edited data :-',action.feeds)
  return updateObject(state, {
    feeds: [...state.feeds, ...action.feeds]
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_FEEDS:
      return setFeeds(state, action);
    case ActionTypes.ADD_FEEDS:
      return addFeeds(state, action);
    default:
      return state;
  }
};

export default reducer;
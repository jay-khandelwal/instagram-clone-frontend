import * as ActionTypes from './ActionTypes';

export const setFeeds = feeds => {
  return {
    type: ActionTypes.SET_FEEDS,
    feeds: feeds,
  };
};

export const addFeeds = feeds => {
  return {
    type: ActionTypes.ADD_FEEDS,
    feeds: feeds
  };
};


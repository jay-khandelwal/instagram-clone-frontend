import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from './Store/Reducers/Auth'
import messageReducer from "./Store/Reducers/Messages";
import profileReducer from "./Store/Reducers/Profile";
import feedsReducer from "./Store/Reducers/Feeds";
import notificationsReducer from "./Store/Reducers/Notifications";
import directReducer from "./Store/Reducers/Direct";

import * as actions from './Store/Actions/Auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*
const rootReducer = combineReducers({
  auth: authReducer,
 
});*/

function configureStore() {
  const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    message: messageReducer,
    feeds:feedsReducer,
    notifications:notificationsReducer,
    direct:directReducer,
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  
  return store;
}

const store = configureStore()

store.dispatch(actions.authCheckState());

const app = (
 /* <React.StrictMode>  </React.StrictMode>*/
    <Router>
    <Provider store={store}>
      <App />
    </Provider>
    </Router>

)

ReactDOM.render(app,document.getElementById('root'));

import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from "react-redux";

import BaseRouter from './Routes';
import WebSocketInstance from './WebSocket2';
import * as notificationActions from "./Store/Actions/Notifications";
import * as directActions from "./Store/Actions/Direct";
import NetworkError from './Pages/NetworkError';

const theme = createMuiTheme({
    breakpoints:{
        values:{
            xs:0,
            sm:600,
            md:768,
            lg:1280,
            xl:1920,
        }
    },
    palette:{
        whitee:'#ffffff',
    },    
})

const App = (props) => {
    const initialiseChat = () => {
        waitForSocketConnection();
        WebSocketInstance.connect();
      }  
    
    useEffect(()=>{
        if (props.token && WebSocketInstance.state() !== 1){
        WebSocketInstance.get_key_and_token(props.token)
        WebSocketInstance.addCallbacks(props.addNotificationCount, props.setMainCount, props.setDirectCount, props.addDirect)
        initialiseChat();            
        }
    }, [props.token])
    
    const waitForSocketConnection = () => {
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
      //  console.log("Connection is made");
        return;
      } else {
      //  console.log("wait for connection...");
        waitForSocketConnection();
      }
    }, 500);
    }
    
      return (
        <>
        <ThemeProvider theme={theme}>
        <BaseRouter/>
        <CssBaseline/>
        </ThemeProvider>
        {props.nerror &&
        <NetworkError/>
        } 
        </>
      );
}

const mapStateToProps = state => {
  return {
    token:state.auth.token,
    loading:state.auth.loading,
    nerror:state.auth.nerror,
  };
};

const mapDispatchToProps = dispatch => {
    return{
        addNotificationCount: notification => dispatch(notificationActions.addNotificationCount(notification)),
        setMainCount: notification => dispatch(notificationActions.setMainCount(notification)),
        setDirectCount: notification => dispatch(notificationActions.setDirectCount(notification)),
        addDirect: data => dispatch(directActions.addDirect(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

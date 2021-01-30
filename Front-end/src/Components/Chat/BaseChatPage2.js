import React, { useState, useEffect, useRef, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";

import ChatAppbar from './Global/ChatAppbar';
import MessagesInput from './Global/MessagesInput';
import Appbar from '../Global/Navbar';
import { HOST_URL } from "../../Settings";
import WebSocketInstance from '../../WebSocket';
import * as messageActions from "../../Store/Actions/Messages";
import ChatMessage from './Global/ChatMessage';
import MyLoader from '../Global/Loader';
import DeleteAllChatPopup from './DeleteAllChatPopup';

const BaseChatPage = (props) => {
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));    
    const [userData, setUserData] = useState({full_name:'', profile_pic:''})
    const [roomId, setRoomId] = useState(props.id);
    const [loading, setLoading] = useState(false);
    const [pagee, setPagee] = useState(1);
    const firstTime = useRef(true)
    const bscroller = useRef(null);
    const observer = useRef();
    const prevDate = useRef('1919-12-29T15:18:12.478753');
    
    const [open, setOpen] = useState(false);
    const [nextLoader, setNexLoader] = useState(false);

    const handleClose = () => {
    setOpen(false);
    }; 
 
    
    const initialiseChat = () => {
        waitForSocketConnection();
        WebSocketInstance.connect();
      }  
    
    useEffect(()=>{
        setRoomId(props.id)
    }, [props.id])

    
    useEffect(()=>{
        if (firstTime.current===false && WebSocketInstance.state() === 1){
            WebSocketInstance.fetchMessages(pagee)
        }
    }, [pagee])
      
    useEffect(() => {
        setLoading(true)
        const url = `${HOST_URL}/chat/user-info/${roomId}/`;
        axios.get(url, {
            headers:{
                Authorization:`Token ${props.token}`
            }
        })
        .then(resp=>{
            firstTime.current=false
            setUserData({
                full_name:resp.data.full_name,
                profile_pic:resp.data.profile_pic,
            })
            setLoading(false)
            WebSocketInstance.addCallbacks(props.addMessage, props.setMessages, props.oldMessages, props.mloadT, props.mloadF, setNexLoader)
            WebSocketInstance.get_key_and_token(roomId, props.token, props.username)
            initialiseChat();
        })
        .catch(error=>{
            setLoading(false)
        })
        return () => {
            WebSocketInstance.disconnect()
            props.setMessages([])
        }
    }, [props.token, roomId])

    useEffect(()=>{
        bscroller.current.scrollIntoView({behaviour:'smooth'})
    }, [props.messages])
    
    const waitForSocketConnection = () => {
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
     //   console.log("Connection is made");
        return;
      } else {
     //   console.log("wait for connection...");
        waitForSocketConnection();
      }
    }, 500);
    }
    
    const lastElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPagee(p=> p + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [])           
 
    const sendMessageHandler = (messg) => {
        if (messg !== ''){
            const messageObject = {
              from:props.username,
              content: messg,
              roomName:roomId,
              
            };
            WebSocketInstance.newChatMessage(messageObject);
        }
        else{
            return;
        }
    };
    
    const setPrevDate = (date) => {
        prevDate.current = date
    }
    
    
    const renderTimestamp = timestamp => {
        const date = new Date(timestamp)
        const minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()
        if (date.getHours() > 12){
            return `${date.getHours()-12}:${minutes} PM`
        }
        else {
            return `${date.getHours()}:${minutes} AM`
        }
    };
    
    const renderDate = (timestamp) => {
        const date = new Date(timestamp)
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`
    }
    
    const sameDay = (date1, date2) => {
        const d1 = new Date(date1)
        const d2 = new Date(date2)
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }
        
    const all_messages = props.messages.map((message, index)=>(
        <>
        {index===1 && <div ref={lastElementRef}></div>}
        { !sameDay(message.timestamp, prevDate.current) &&
        <div style={{width:'100%', padding:'0.4rem', textAlign:'center'}}>
            <Typography variant='caption'>
           <b> {renderDate(message.timestamp)}</b>
            </Typography>
        </div>
        }                            
         {setPrevDate(message.timestamp)}
            <ChatMessage key={message.id} id={message.id} content={message.content} timestamp={renderTimestamp(message.timestamp)} username={props.username} sender={message.sender} token={props.token} />    
        
        </>
        ))
    
    const mainContent = (
        <>
        <div style={{width:'100%', height:'100%', overflowY:'auto', display:'flex', flexDirection:'column', alignItems:'flex-end', marginBottom:'80px', paddingBottom:'80px', position:'relative', padding:'0.4rem',boxSizing:'border-box'}}>
        {nextLoader&&
        <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="Rings" color="#b3b3b3" height={40} width={40} timeout={1000}/>
        }
        {all_messages}
        <div ref={bscroller}></div>
        </div>
        <MessagesInput forsubmit={sendMessageHandler} />  
        </>        
        )
    
    return(
        <>
        { upMd ?
        <>
        <ChatAppbar full_name={userData.full_name} profile_pic={userData.profile_pic} loading={loading} setOpen={setOpen}/>
            {mainContent}
            {props.loading &&
            <MyLoader style={{position:'absolute'}}/>
            }            
        </>
        :
        <>
            <Appbar chat full_name={userData.full_name} profile_pic={userData.profile_pic} loading={loading} setOpen={setOpen}/>
            {mainContent}
            {props.loading &&
            <MyLoader/>
            }
        </>
        }
        {open &&
        <DeleteAllChatPopup open={open} onClose={handleClose} roomid={roomId}/>
        }
        </>
        );
}

const mapStateToProps = state => {
  return {
    messages: state.message.messages,
    loading: state.message.loading,
    token:state.auth.token,
    username:state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
    return{
        addMessage: message => dispatch(messageActions.addMessage(message)),
        setMessages: messages => dispatch(messageActions.setMessages(messages)),
        oldMessages: messages => dispatch(messageActions.oldMessages(messages)),
        mloadT: () => dispatch(messageActions.mloadT()),
        mloadF: () => dispatch(messageActions.mloadF()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseChatPage);
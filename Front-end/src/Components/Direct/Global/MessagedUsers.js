import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { connect } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";

import Appbar from '../../Global/Navbar';
import UserContainer from './UserContainer';
import { HOST_URL, renderTimestamp } from "../../../Settings";
import * as directActions from "../../../Store/Actions/Direct";
import * as authActions from "../../../Store/Actions/Auth";
import LoadBar from '../../Global/LoadBar';

const useStyles = makeStyles((theme) => ({
    gridOne:{
        width:'100%',
        [theme.breakpoints.up('md')]:{
        },
    },
    grow: {
      flexGrow: 1,
    },
    directappbar:{
        position:'sticky',
        top:0,
        left:0,
        right:0,
        zIndex:2,
        backgroundColor:'white',
       borderBottom:'1px solid #6565653c',
   [theme.breakpoints.down('sm')]:{
       display:'none',
    },   
    },
    toolbarHeading:{
        width:'100%',
        textAlign:'center'
    },
    iconStyle:{
        position:'absolute',
        right:4,
    },
    chatName:{
        maxHeight:'100%',
        height:'100%',
        overflowY:'auto',
        paddingBottom:'60px',
        '@media (max-width:768px)':{
            paddingBottom:'57px'
        }        
    },
    noDisplay:{
        '@media (max-width:768px)':{
            display:'none'
        }
    },
    noContent:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      msTransform: 'translateX(-50%) translateY(-50%)',
      webkitTransform: 'translate(-50%,-50%)',
      transform: 'translate(-50%,-50%)',
      textAlign:'center',
      width:'80%',
      fontWeight:'400',
      fontSize:'14px',
      color:'#cbcbcb'
    },        
}));

const MessagedUsers = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));
    const initialData = {
        next_url:null,
        count:null,
    }
    const [aData, SetAData] = useState(initialData);
    const [pagee, setPagee] = useState(1);
    const [loading, setLoading] = useState(false);
    const [nextLoader, setNextLoader] = useState(false);
    const [noContent, setNoContent] = useState(false);
    const firstTime = useRef(true)
    
    const observer = useRef()
    
    useEffect(()=>{
        if (pagee > 1 && aData.next_url !== null && firstTime.current===false){
            setNextLoader(true)
          axios.get(aData.next_url, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp=>{
                props.setDirect(resp.data.results)
                setNextLoader(false)
                SetAData({
                    next_url:resp.data.next_url,
                    count:resp.data.count,
                })
            })
            .catch(error=>{
                setNextLoader(false)
            })                         
        }
    }, [pagee])        
    
        useEffect(() => {
            setLoading(true)
            const url = `${HOST_URL}/chat/chatted/user/`
            axios.get(url, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            . then(resp=>{
                if (resp.status !==204){
                    props.set2Direct(resp.data.results)
                    SetAData({
                        next_url:resp.data.next_url,
                        count:resp.data.count,
                    })
                    firstTime.current = false
                }
                else {
                setNoContent(true)
                } 
                setLoading(false)
            })
            .catch(error=>{
                setLoading(false)
                if (!error.response){
                    props.nerror()
                }                            
            })
        }, [props.token])
        
        
        const lastElementRef = useCallback(node => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setPagee(p=> p + 1)
                }
            })
            if (node) observer.current.observe(node)
        }, [])           

        const sideUsers = props.directUser.map((user, index)=>{
            if (props.directUser.length === index + 1){
                return(
                    <>
                    <UserContainer key={user.id} username={user.username} profile_pic={user.profile_pic} id={user.roomName} lastmssg={user.lastmssg.content} read={user.lastmssg.read} timestamp={renderTimestamp(user.lastmssg.timestamp)} unread_mssg_count={user.unread_mssg_count}/>
                    <div ref={lastElementRef}></div>
                    </>
                    )
            }
            else{
                return(
                    <UserContainer key={user.id} username={user.username} profile_pic={user.profile_pic} id={user.roomName} lastmssg={user.lastmssg.content} read={user.lastmssg.read} timestamp={renderTimestamp(user.lastmssg.timestamp)}  unread_mssg_count={user.unread_mssg_count}/>
                    )
            }
            
        })    
    
    const directToolbar = (
            <Toolbar className={classes.directappbar}>
                <div className={classes.grow} />
             
                <Typography component="h5" variant="h5" id='instagramtext' className={classes.toolbarHeading}>
                   Direct
                </Typography>
    
                <IconButton 
                component={Link} 
                to={{
                pathname: "/direct/new",
                state: { isModal: true }
                }}
                className={classes.iconStyle}>
                    <CreateOutlinedIcon />
                </IconButton>
            </Toolbar> 
        )    
    
    return(
        <>
        { !upMd &&
        <Appbar direct />
        }
        { upMd &&
        directToolbar
        }
        { !loading ?
        <>
        { !noContent ?
        <div>
            {sideUsers}
            { nextLoader &&
            <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="Oval" color="#939ea1" height={30} width={30} />
            }            
        </div>
        :
            <Typography variant='h5' component='span' className={classes.noContent} >
                No Messages
           </Typography>
        }
        </>
        :
        <>
        <LoadBar/>
        {upMd &&
        <Loader type='ThreeDots' height={40} width={40} color='#000000' style={{position:'absolute', top:'10%', left:'50%', transform: 'translate(-50%, -50%)'}}/>
        }
        </>
        }
       </>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token,
        directUser: state.direct.directUsers,
    };
};

const mapDispatchToProps = dispatch => {
    return{
        setDirect: data => dispatch(directActions.setDirect(data)),
        set2Direct: data => dispatch(directActions.set2Direct(data)),
        nerror: () => dispatch(authActions.nerror()),
    }
}

export default React.memo(connect(mapStateToProps,  mapDispatchToProps)(MessagedUsers));

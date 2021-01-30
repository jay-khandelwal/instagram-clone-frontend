import React, {useState, useEffect, useRef, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';
import Loader from "react-loader-spinner";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import BottomAppBar from '../Global/BottomBar'; 
import NotificationCard from './Global/NotificationCard';
import EditProfileAppbar from '../Profile/Global/EditProfileAppbar';
import CustomAppbar from '../Global/CustomAppbar';
import { HOST_URL } from "../../Settings";
import MyLoader from '../Global/Loader';
import LoadBar from '../Global/LoadBar';
import * as authActions from "../../Store/Actions/Auth";

const useStyles = makeStyles((theme) => ({
    mainContent:{
        width:'100%',
        height:'100%',
        paddingTop:'70px',
        position:'relative',
        zIndex:10,
        backgroundColor:'white',
    },
    container1:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap',
        paddingBottom:'70px'
    },
    container2:{
        display:'flex',
        boxSizing:'border-box',
        flexDirection:'column',
        margin:'0px',
        padding: '0px',
        position: "relative",
        backgroundColor:'white',
        height:'100%',
        justifyContent:'flex-start',
        alignItems:'stretch',
        alignContent:'stretch',
        paddingTop:'0.6rem',
        paddingBottom:'40px',
        overflowY:'auto',
        '@media (max-width:768px)':{
            paddingBottom:'100px'
        }       
    },
    noContent:{
      position: 'fixed',
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
    }))
    
const ActivityPage = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));   
    const initialData = {
        notifications:[],
        next_url:null,
        count:null,
    }    
    const [notifications, setNotifications] = useState(initialData);
    const [pagee, setPagee] = useState(1);
    const [nextLoader, setNexLoader] = useState(false);
    const [noContent, setNoContent] = useState(false);
    const [loading, setLoading] = useState(false);
    const firstTime = useRef(true)
    const observer = useRef();
    
    useEffect(()=>{
        if (pagee > 1 && firstTime.current===false){   setNexLoader(true) 
            axios.get(notifications.next_url,  {
                headers:{
                    Authorization:`Token ${props.token}`
                }
            })
            .then(resp=>{
                setNotifications({
                notifications : [...notifications.notifications, ...resp.data.results],
                next_url:resp.data.next_url,
                count:resp.data.count,
                })
                setNexLoader(false)
            })
            .catch(error=>{
                setNexLoader(false)
            })
        }
    }, [pagee])
    
    useEffect(()=>{
        setLoading(true)
        const url = `${HOST_URL}/notifications/`;
        axios.get(url,  {
            headers:{
                Authorization:`Token ${props.token}`
            }
        })
        .then(resp=>{
            if (resp.status !==204){
                setNotifications({
                    notifications:resp.data.results,
                    next_url:resp.data.next_url,
                    count:resp.data.count,
                })
                firstTime.current = false
                if (resp.data.count === 0){
                    setNoContent(true)
                }
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
                if (firstTime.current ===true){
                    firstTime.current = false
                }                
                setPagee(p=> p + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [])           
    
    const all_notifications = notifications.notifications.map((notification, index) =>{
        if(notifications.notifications.length === index + 3){
        return (
            <>
            <NotificationCard key={notification.id} from={notification.from_user} profile_pic={notification.fprofile_pic} timestamp={notification.timestamp} type={notification.ntype} read={notification.read} other={notification.other} /> 
            <div ref={lastElementRef}></div>
            </>
            )
        }
        else{
        return (<NotificationCard key={notification.id} from={notification.from_user} profile_pic={notification.fprofile_pic} timestamp={notification.timestamp} type={notification.ntype} read={notification.read} other={notification.other} /> )           
        }
        }
    )
    
    return  (
        <div className={classes.mainContent}>
        { upMd ?
            <EditProfileAppbar heading='Activity' />
        :
            <CustomAppbar heading='Activity' />
        }
        { !loading ?
        <>
          <ButtonGroup size="small" aria-label="small outlined button group" fullWidth style={{padding:'0.2rem'}}>
            <Button component={Link} to={{pathname: "/activity/requests", state: { activity: true }}}>Request Received</Button>
            <Button component={Link} to={{pathname: "/activity/requested", state: { activity: true }}}>Request Made</Button>
          </ButtonGroup>        
        { !noContent ?            
            <div className={upMd ? classes.container2 : classes.container1}>
            {all_notifications}
            {nextLoader &&
            <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="TailSpin" color="#b8b8b8" height={30} width={30} />
            }
            </div>
      
        :
        <Typography variant='h5' component='span' className={classes.noContent}>
            No Notification Yet.
        </Typography>
        }
        </>
        :
        <>
        { upMd ?
        <MyLoader/>
        :
        <LoadBar />
        }
        </>
        }
            <BottomAppBar/>
            
        </div>                    
        )
   
}

const mapStateToProps = state => {
  return {
      token: state.auth.token,
      notifications: state.notifications.notifications,
  };
};

const mapDispatchToProps = dispatch => {
    return{
        nerror: () => dispatch(authActions.nerror()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage)

import React, { useState, useEffect , useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";
import Typography from '@material-ui/core/Typography';
import UserItem from '../Global/UserItem';
import EditProfileAppbar from './Global/EditProfileAppbar';
import CustomAppbar from '../Global/CustomAppbar';
import BasePopup from '../Global/BasePopup';
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
        borderRadius:'30px'
    },
    container:{
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


const Follows = (props) => {
   const classes=useStyles();
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));   
    const initialData = {
        data:[],
        next_url:null,
        count:null,
    }           
   const [data, setData] = useState(initialData);
   
   const [pagee, setPagee] = useState(1);
   const [nextLoader, setNexLoader] = useState(false);
   const [noContent, setNoContent] = useState(false);
   const [loading, setLoading] = useState(false);
    
   const firstTime = useRef(true)
   const observer = useRef();   

    useEffect(()=>{
        if (pagee > 1 && firstTime.current===false){   setNexLoader(true) 
            axios.get(data.next_url,  {
                headers:{
                    Authorization:`Token ${props.token}`
                }
            })
            .then(resp=>{
                setData({
                data : [...data.data, ...resp.data.results],
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
        var url;
        if (props.followers){
           url = `${HOST_URL}/profile/followers/${props.username}/`
        }
        else{
           url = `${HOST_URL}/profile/followings/${props.username}/` 
        }
        axios.get(url, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            if (resp.data && resp.data.count === 0){
                setNoContent(true)
            }
            else{
                setData({
                    data:resp.data.results,
                    next_url:resp.data.next_url,
                    count:resp.data.count,
                })
            }
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            if (!error.response){
                props.nerror()
            }                        
        })        
    },[props.token, props.username, props.followers]) 
    
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
    
    const userDiv = data.data.map((item, index)=>{
        if (data.data.length === index + 3){
            return (
              <>
              <UserItem key={item.id} first={item.username} second={item.full_name} profile_pic={item.profile_pic} type={item.userType}/>
              <div ref={lastElementRef}></div>
              </>
            )
        }
        else{
            return (
                <>
              <UserItem key={item.id} first={item.username} second={item.full_name} profile_pic={item.profile_pic} type={item.userType}/>
              <div ref={lastElementRef}></div>
              </>
            )
        }
     })
     
     const maincontent = (
        <div className={classes.mainContent}>      
        { upMd ?
            <EditProfileAppbar heading={props.followers ? 'Follower' : 'Following'} />
        :
            <CustomAppbar heading={props.followers ? 'Follower' : 'Following'} />
        }
        {!loading ?
        <>
        { !noContent ?
            <div className={upMd ? classes.container : ''}>
                {userDiv}
                {nextLoader &&
                <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="TailSpin" color="#797979" height={30} width={30} />
                }                
            </div>
            :
            <Typography variant='caption' component='span' className={classes.noContent}>
                No {props.followers ? 'Follower' : 'Following'}
            </Typography>                        
        }
        </>
        :
        <>
        {upMd ?
        <MyLoader/>
        :
        <LoadBar/>
        }
        </>
        }
        </div>         
         )

    return(
        <>
        { !upMd &&
        <>
            {maincontent}
        </>         
        }
        { upMd &&
            <BasePopup>
        <>
            {maincontent}
        </>         
            </BasePopup>
        }
        </>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return{
        nerror: () => dispatch(authActions.nerror()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Follows);

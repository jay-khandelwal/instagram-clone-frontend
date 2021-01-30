import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Loader from "react-loader-spinner";

import UserItem from '../Global/UserItem';
import CustomAppbar from '../Global/CustomAppbar';
import EditProfileAppbar from '../Profile/Global/EditProfileAppbar';
import BasePopup from '../Global/BasePopup';
import { HOST_URL } from "../../Settings";

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor:'white',
    },
    content:{
        width:'100%',
        height:'100%',
        paddingTop:'70px',
        backgroundColor:'white'
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
      fontWeight:'300',
      fontSize:'20px'
    },        
}));


const LikePage = (props) => {
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
        const url = `${HOST_URL}/posts/${props.match.params.slug}/liked_by/`

        axios.get(url, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            if (resp.status !==204){
                setData({
                    data:resp.data.results,
                    next_url:resp.data.next_url,
                    count:resp.data.count,
                })
                firstTime.current = false
            }
            else {
                setNoContent(true)
            }        
        })
        .catch(error => {
        })        
    },[props.token,props.match.params.slug ]) 
    
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
        if (data.data.length === index + 1){
            return(
            <>
            <div ref={lastElementRef}></div>
            <UserItem first={item.username} second={item.full_name} profile_pic={item.profile_pic} type={item.userType}/>
            </>
            )
        }
        else{
            return(
            <UserItem first={item.username} second={item.full_name} profile_pic={item.profile_pic} type={item.userType}/>          
            )
        }
     })
     

     const maincontent = (
        <div style={{width:'100%', position:'relative', zIndex:10, overflowY:'auto', minHeight:'100%', backgroundColor:'white'}}> 
            { !upMd ?
            <CustomAppbar heading='Likes' />
            :
            <EditProfileAppbar heading='Likes' />
            }
            { !noContent ?
            <div className={classes.content}>
                {userDiv}
                {nextLoader &&
                <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="BallTriangle" color="#43de6c" height={40} width={40} />     
                }
            </div>
            :
            <Typography variant='h5' component='span' className={classes.noContent}>
                No Likes
            </Typography>            
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

export default connect(mapStateToProps)(LikePage);

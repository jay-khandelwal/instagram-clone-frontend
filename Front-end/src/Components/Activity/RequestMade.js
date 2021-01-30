import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import EditProfileAppbar from '../Profile/Global/EditProfileAppbar';
import UserItem from '../Global/UserItem';
import { HOST_URL } from "../../Settings";
import Loader from '../Global/Loader';

const useStyles = makeStyles((theme) => ({
    container:{
        width:'100%',
        height:'100%',
        overflowY:'auto',
        paddingTop:'70px',
        backgroundColor:'white',
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

const RequestMade = (props) => {
    const classes = useStyles();
    const [requests, setRequests] = useState([]);
    const [noContent, setNoContent] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        setLoading(true)
        const url = `${HOST_URL}/frequest/sended/`
        axios.get(url, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            if (resp.data.results.length===0){
                setNoContent(true)
                setLoading(false)
            }
            else{
                setRequests(resp.data.results)
                setLoading(false)
            }

        })
        .catch(error => {
            setLoading(false)
        })        
    },[props.token])   
    
    const all_requests = requests.map(request=>(
        <UserItem profile_pic={request.reveiver_profile_pic} second={request.receiver_name} first={request.receiver_username} type='requested'/> 
    ))    
  
        
    return  (
        <>
            <EditProfileAppbar heading='Request Made'/>
            {!loading ?
            <div className={classes.container}>
                {!noContent ?
                all_requests
                :
                <Typography variant='h5' component='span' className={classes.noContent}>
                    No Request
                </Typography>
                }
            </div>  
            :
            <Loader/>
            }
        </>        
        )
  
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(RequestMade);




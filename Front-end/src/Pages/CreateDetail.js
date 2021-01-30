import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';

import EditProfileAppbar from '../Components/Profile/Global/EditProfileAppbar';
import { HOST_URL } from "../Settings";
import BasePopup from '../Components/Global/BasePopup';

const useStyles = makeStyles((theme)=>({
    root:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        position:'relative',
        paddingTop:'60px'
    },
    content:{
        width:'100%',
        padding:'1rem',
        display:'flex',
        alignContent:'center',
    },
    content_one:{
        width:'100%',
        display:'flex',
        alignContent:'center',
        '& textarea':{
            marginBottom:'auto',
            padding:'0px',
        },
        '& div.MuiInputBase-root':{
            width:'100%',
            paddingTop:'0px',
            paddingLeft:'0.6rem',
            paddingRight:'0.7rem',
        }
    },
    small:{
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

const CreateDetail = (props) => {
    const classes = useStyles();
    const history = useHistory();
    
    const initialData = {
        'username':'',
        'profile_pic':'',
        'post':props.imageFile,
        'caption':''
    }
    const [data, setData] = useState(initialData);

    useEffect(()=>{
        const url = `${HOST_URL}/accounts/user-detail/`
        axios.get(url, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            setData(data => ({...data, profile_pic:resp.data.profile_pic, username:resp.data.username}))
        })
        .catch(error=>{
        })
    }, [props.token])
    
    const handleCaptionChange = (e) => {
        setData({
            ...data,
            caption:e.target.value
        })
    }
    
    const HandleShareBtn = () => {
        if (data.post !== null){
         
            let form_data = new FormData();
            form_data.append('post', props.imageFile, props.imageFile.name)
            form_data.append('caption', data.caption)
            
            const url = `${HOST_URL}/posts/create/`
            axios.post(url, form_data , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
           })
           .then(resp=>{
               history.push('/')
           })
           .catch(error=>{
           })
        }
    }
    
    var src = null
    try {
    src = window.URL.createObjectURL(props.imageFile)
    }
    catch{
        history.push('/')
    }
    
    const mainContent = (
        <div className={classes.root}>
        <EditProfileAppbar heading='New Post'>
            <div style={{ position:'absolute', right:4}}>
                <Button onClick={HandleShareBtn} size='small' style={{color:'#34a8de'}}>
                  <b>  Share </b>
                </Button>
            </div>
        </EditProfileAppbar>
        <div className={classes.content}>
            <div className={classes.content_one}>
                <Avatar alt="Remtkrp" src={data.profile_pic} className={classes.small} /> 
                <InputBase multiline={true} value={data.caption} onChange={handleCaptionChange} rows='3' type='text' placeholder='Write a caption...'/>
            </div>
            <div className={classes.content_img}>
                <img alt='aksdk' src={src} style={{width:'50px', height:'50px'}}/>
            </div>
        </div>
        </div>        
        )

    return(
        <BasePopup>
            {mainContent}
        </BasePopup>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token,
        imageFile:state.profile.uploadedImageFile,
    };
};

export default connect(mapStateToProps)(CreateDetail);


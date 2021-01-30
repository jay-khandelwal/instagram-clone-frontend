import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Loader from "react-loader-spinner";
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { connect } from 'react-redux';

import IconAndName from './IconAndName';
import LoadBar from '../../Global/LoadBar';
import AlertBar from './Alert';
import { HOST_URL } from "../../../Settings";
import Fields from './FieldFrame';
import * as authActions from '../../../Store/Actions/Auth';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
    },
    container:{
        width:'100%',
    },
    fieldContent:{
        marginBottom:'1rem',
    },
    fieldlabel:{
      [theme.breakpoints.up('md')]:{
          textAlign:'right',
          paddingRight:'0.8rem'
      }        
    },
    inputfield:{
        marginBottom:'0.7rem',
        '& .MuiOutlinedInput-input':{
            padding:'6px'
        }
    },
    btnstyle:{
      minWidth:'86px',
      [theme.breakpoints.up('md')]:{
          marginLeft:'25%',
      }     
    },
    fieldtext:{
        marginBottom:'0.8rem',
        [theme.breakpoints.up('md')]:{
          marginLeft:'25%',
          marginRight:'9%',
      }      
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        backgroundColor:'tomato'
    },
}));


const EditForm = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertData, setAlertData] = useState({});
   
    const alertHandleClick = (type, message) => {
    setAlertOpen(true);
    setAlertData({
        type:type,
        message:message
    })
    };
    
    const alertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
    };          
       
    const profileData = {
        username:'',
        full_name:'',
        email:'',
        bio:'',
        website:'',
        phone_no:'',
        gender:null,
    }
    
    const [data, setData] = useState(profileData)
    // new state for profile_pic because getting an error in doing it in above state
    const [profile_pic, setProfile_pic] = useState(null)

    const getvalueHandler = (e) => {
      setData({
          ...data,
          [e.target.name]:e.target.value
      })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        
        let url = `${HOST_URL}/accounts/profile/edit/`
        axios.put(url, data, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            setSubmitted(false)
            props.changeUsername(resp.data.username)
            alertHandleClick('success', 'Profile Updated Successfully.');
        })
        .catch(error => {
            setSubmitted(false)
            alertHandleClick('error', 'An Error Occur.');
        })
    }
    
    useEffect(() => {
        setLoading(true)
        axios.get(`${HOST_URL}/accounts/profile/edit/`, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then((response)=> {
            let data = response.data;
            setData({
                username:data.username,
                full_name:data.full_name,
                email:data.email,
                bio:data.bio,
                website:data.website,
                phone_no:data.phone_no,
                gender:data.gender,
            })
            setProfile_pic(data.profile_pic)
            setLoading(false)
        })
        .catch((error)=>{
            setLoading(false)
        })
    }, [props.token])    
    return(
        <div style={{width:'100%', height:'100%', overflow:'hidden', boxSizing:'border-box'}}>
        { ! loading ?
        <div className={classes.root}>
        <IconAndName 
        name={data.username} 
        profile_pic={profile_pic}
        />
        <div className={classes.container}>
        <form onSubmit={handleSubmit}>
            <Fields label='Name' name='full_name' value={data.full_name} onChange= {getvalueHandler} detail="Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
You can only change your name twice within 14 days.
"/>
            <Fields label='Username' name='username' value={data.username} onChange= {getvalueHandler} detail="In most cases, you'll be able to change your username back to jay___khandelwal for another 14 days. Learn More"/>
            
       
            <Fields label='Website' name='website'value={data.website} onChange= {getvalueHandler} />
       
            <Fields label='Bio' name='bio' value={data.bio} onChange= {getvalueHandler} bio={true} />
            
            <div className={classes.fieldtext}>
           <Typography variant='caption' >
                <b>Personal Information</b><br/>
                Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile
            </Typography>
            </div>
            
            <Fields label='Email' name='email' value={data.email} onChange= {getvalueHandler} />
            <Fields label='Phone No.' name='phone_no' value={data.phone_no} onChange= {getvalueHandler} />
            
            <Fields label='Gender' name='gender' value={data.gender} onChange={getvalueHandler}>

              <FormControl variant="outlined" className={classes.formControl} style={{width:'100%'}}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={data.gender || ''}
                  onChange={getvalueHandler}
                  name= 'gender'
                  autoWidth={true}
                >
        
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                  <MenuItem value={3}>Other</MenuItem>
                </Select>
              </FormControl>
            </Fields>
            
          <Button 
          type='submit'
          variant="contained" 
          className={classes.btnstyle}
          disabled={submitted}
          style={{ backgroundColor:'#009cfde8', color:'white'}}>
          
            {!submitted ? 
            'Submit' 
            : 
            <Loader
            width={15}
            height={15}
            type='TailSpin'
            color='white'
            />
            }
            
          </Button>  
        
        </form>  
        </div>
        </div>
        :
        <LoadBar/>
        }
        <AlertBar
        message={alertData.message}
        handleClose={alertHandleClose}
        open={alertOpen}
        type={alertData.type}
        />                
        </div>
        );
}


const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return{
        changeUsername : username => dispatch(authActions.changeUsername(username)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from "react-loader-spinner";
import axios from 'axios';
import { connect } from 'react-redux';

import { HOST_URL } from "../../../Settings";
import Fields from './FieldFrame';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
    },
    container:{
        width:'100%',
    },
    btnstyle:{
      minWidth:'86px',
      [theme.breakpoints.up('md')]:{
          marginLeft:'25%',
      }     
    },
}));

const ChangePassword = (props) => {
    const classes = useStyles();
    const [submitted, setSubmitted] = useState(false);
    
    const initialData = {
        'old_password': '',
        'new_password1': '',
        'new_password2': '',
    }
    
    const [passwords, setPasswords] = useState(initialData);

    const getvalueHandler = (e) => {
      setPasswords({
          ...passwords,
          [e.target.name]:e.target.value
      })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        
        let url = `${HOST_URL}/rest-auth/password/change/`
        axios.post(url, {'old_password':passwords.old_password, 'new_password1':passwords.new_password1, 'new_password2':passwords.new_password2}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            setSubmitted(false)
        })
        .catch(error => {
            setSubmitted(false)
        })
    }
    
    return(
        <div style={{width:'100%', height:'100%', overflow:'hidden', boxSizing:'border-box'}}>
        <div className={classes.root}>
        <div className={classes.container}>
        <form onSubmit={handleSubmit}>
            <Fields label='Password' name='old_password' value={passwords.old_password} onChange= {getvalueHandler} type='password'/>
            <Fields label='New Password' name='new_password1' value={passwords.new_password1} onChange= {getvalueHandler} type='password'/>
            <Fields label='Confirm New Password' name='new_password2' value={passwords.new_password2} onChange= {getvalueHandler} type='password'/>
            
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

        </div>
        );
}


const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(ChangePassword);
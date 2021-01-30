import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '../Components/Global/InputField';
import BaseForm from '../Components/Registration/Global/BaseForm';
import FormFrame from '../Components/Registration/Global/Frame';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import axios from 'axios';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { HOST_URL } from "../Settings";

import * as actions from '../Store/Actions/Auth';
import RegistrationErrorDialogBox from '../Components/Registration/RegistrationErrorDialogBox';

const useStyles = makeStyles((theme)=>({
    overview:{
        padding:'0.8rem',
        '& p':{
            color:'#38383897'
        }
    },
    btn:{
        borderTop:'1px solid #83838355'
    }
}))

const LoginForm = (props) => {
    const classes = useStyles();
    const loginData = {
        username: '',
        password:''
    }
    
    const [credentials, setCredentials] = useState(loginData);
    const [redirect, setRedirect] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMssg, setErrorMssg] = useState({'type':'', 'mssg':''});
    
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    }; 
    
    const getvalueHandler = (e) => {
      setCredentials({
          ...credentials,
          [e.target.name]:e.target.value
      })
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true)
        const url = `${HOST_URL}/rest-auth/login/`;
        axios.post(url, credentials)
        .then(resp=>{
            const user = {
                token:resp.data.key,
                username:resp.data.username
            }
            localStorage.setItem('user', JSON.stringify(user));
            props.authSuccess(user)
            setSubmitted(false)
            setRedirect(true)
        })
        .catch(error=>{
            if (error.response.data.non_field_errors){
                setErrorMssg({
                    'mssg':error.response.data.non_field_errors[0],
                    'type':error.response.data.non_field_errors[1]
                })
            }
            else if (error.response.data.password){
                setErrorMssg(error.response.data.password[0])
            }
            else if (error.response.data.password1){
                setErrorMssg(error.response.data.password1[0])
            }
            else if (error.response.data.email){
                setErrorMssg(error.response.data.email[0])
            }
            else if (error.response.data.username){
                setErrorMssg(error.response.data.username[0])
            }
            else{
                
            }
            setOpen(true)
            setSubmitted(false)
        })
    }
    
    if (redirect===true) {
        return <Redirect to='/' />
    }
    
    return(
        <FormFrame
        bottomline="Don't have an account?"
        linktext=' Sign up'
        url='/signup/'  
        fbbtn='Continue with Facebook'
        login={true}
        >
        <BaseForm 
        btnName='Login'
        formHandler= {handleSubmit}
        submited={submitted}
        >
        
            <Input
            label = 'Username'
            name='username'
            value= {credentials.username}
            onChange= {getvalueHandler}
            type='text'
            />
            <Input
            label = 'Password'
            name='password'
            value= {credentials.password}
            onChange= {getvalueHandler}
            type='password'
            />  
        
        
        </BaseForm>
        { open &&
        <RegistrationErrorDialogBox open={open} close={handleClose} >
         
            <div className={classes.overview}>
                { errorMssg.type==='wrong_data' &&
                <Typography variant='h6' component='h6' style={{fontWeight:'500'}}>
                    Incorrect credentials
                </Typography>
                }
                <Typography variant='caption' component='p' >
                    {errorMssg.mssg}
                </Typography>
            </div>
            <div className={classes.options}>
                { errorMssg.type==='wrong_data' &&
                <Button fullWidth={true} onClick={handleClose} className={classes.btn}>
                    Try Again
                </Button>
                }
                { errorMssg.type === 'email' &&
                <Button fullWidth={true} component={Link} to='/accounts/verify-email' className={classes.btn}>
                    Verify Your Email
                </Button>
                }
            </div>        
            
        </RegistrationErrorDialogBox>
        }      
        </FormFrame>
        );
}

const mapStateToProps = state => {
    return{
        loading:state.auth.loading,
        error:state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        authSuccess: user => dispatch(actions.authSuccess(user)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);


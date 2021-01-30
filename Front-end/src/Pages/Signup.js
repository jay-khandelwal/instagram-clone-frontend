import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { HOST_URL } from "../Settings";
import Input from '../Components/Global/InputField';
import BaseForm from '../Components/Registration/Global/BaseForm';
import FormFrame from '../Components/Registration/Global/Frame';
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

const SignupForm = (props) => {
    const classes = useStyles();
    const loginData = {
        email:'',
        full_name:'',
        username: '',
        password1:'',
        password2:'',
    }
    
    const [credentials, setCredentials] = useState(loginData);
    const [submitted, setSubmitted] = useState(false);
    const [resp, setResp] = useState(false);
    
    const [errorMssg, setErrorMssg] = useState('');
    
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
        const url = `${HOST_URL}/rest-auth/registration/`;
        axios.post(url, credentials)
        .then(resp=>{
            setSubmitted(false)
            setResp(true)
            setOpen(true)
        })
        .catch(error=>{
            if (error.response.data.non_field_errors){
                setErrorMssg(error.response.data.non_field_errors[0])
            }
            if (error.response.data.password){
                setErrorMssg(error.response.data.password[0])
            }
            if (error.response.data.password1){
                setErrorMssg(error.response.data.password1[0])
            }
            if (error.response.data.email){
                setErrorMssg(error.response.data.email[0])
            }
            if (error.response.data.username){
                setErrorMssg(error.response.data.username[0])
            }
            else{
                setErrorMssg('An error occours. Please try again.')
            }
            setOpen(true)
            setSubmitted(false)
        })
    }    
    
    
    return(
        <FormFrame 
        bottomline='HAVE AN ACCOUNT?'
        linktext=' Log In'
        url='/login/'
        fbbtn='Log in with Facebook'
        >
        
        <Typography>
            Sign up to see photos and videos from your friends.
        </Typography>
        
        <BaseForm 
        btnName='Sign Up'
        formHandler= {handleSubmit}
        submited={submitted}
        >
        
            <Input
            label = 'E-mail'
            name='email'
            value= {credentials.email}
            onChange= {getvalueHandler}
            type='email'
            />
            <Input
            label = 'Full Name'
            name='full_name'
            value= {credentials.full_name}
            onChange= {getvalueHandler}
            type='text'
            />
            <Input
            label = 'Username'
            name='username'
            value= {credentials.username}
            onChange= {getvalueHandler}
            type='text'
            />            
            <Input
            label = 'Password'
            name='password1'
            value= {credentials.password1}
            onChange= {getvalueHandler}
            type='password'
            />
            <Input
            label = 'Confirm Password'
            name='password2'
            value= {credentials.password2}
            onChange= {getvalueHandler}
            type='password'
            />  
        
        </BaseForm>
        { open &&
        <RegistrationErrorDialogBox open={open} close={handleClose} > 
            { !resp ?
            <>
            <div className={classes.overview}>
                <Typography variant='caption' component='p' >
                    {errorMssg}
                </Typography>
            </div>
            <div className={classes.options}>
                <Button fullWidth={true} onClick={handleClose} className={classes.btn}>
                    close
                </Button>
            </div> 
            </>
            :
            <div style={{'paddingTop':'0.8rem', paddingBottom:'0.8rem'}}>
                <CheckCircleOutlineIcon style={{width:'50px', height:'50px'}}/>
                <Typography variant='h6' component='h6' style={{fontWeight:'500', fontSize:'20px'}}>
                    Account Created Successfully
                </Typography>                
               <Typography variant='caption' component='p' style={{paddingLeft:'0.8rem', paddingRight:'0.8rem', color:'tomato'}} >
                  ** Please activate your account through the link we send on your provided email address (expires within 15 min). 
               </Typography>
            </div>            
            }
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

export default connect(mapStateToProps)(SignupForm);


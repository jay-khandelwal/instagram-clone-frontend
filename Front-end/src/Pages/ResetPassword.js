import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Loader from "react-loader-spinner";
import Slide from '@material-ui/core/Slide';

import Input from '../Components/Global/InputField';
import { HOST_URL } from "../Settings";
import AlertBox from '../Components/Registration/AlertBox';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        '@media (max-width:768px)':{
            backgroundColor:'white'
        }        
    },
    container:{
        width:'100%',
        alignSelf:'center',
        position:'relative',
        padding:'1.4rem',
        textAlign:'center',
        '@media (min-width:450px)':{
            maxWidth:'350px',
            border:'1px solid #c1c1c16f',
            backgroundColor:'white',
        }, 
        '@media (max-width:450px)':{
            height:'100%',
        }
    },
    content:{
        width:'100%',
        height:'100%',
        position:'realtive',
        padding:'1.4rem',
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        flexWrap:'wrap',
        paddingTop:'60px',
    },
    lockStyle:{
       width:'70px',
       height:'70px',
       border:'4px solid black',
       borderRadius:'100px',
       padding:'0.6rem',
       fontSize:'5px',
       margin:'0.4rem',
    },
    headingStyle:{
        fontSize:'26px',
        margin:'0.4rem',
    },
    textStyle:{
        fontSize:'14px',
        color:'#bababa',
        fontWeight:'400',
        margin:'0.4rem',
    },
    btnstyle:{
        width:'80%', 
        margin:'0.4rem',
    },
    heading:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        borderBottom:'1px solid #6565653c',
        padding:'0.6rem',
    },
}));

const ResetPassword = (props) => {
    const classes = useStyles();
    const initialData = {
        'uid':props.match.params.ud,
        'token':props.match.params.tkn,
        'new_password1': '',
        'new_password2': '',
    }
    const [passwords, setPasswords] = useState(initialData);
    const [load, setLoad] = useState(false);
    const [mssg, setMssg] = useState('');
    const [transition, setTransition] = useState(undefined);
    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
        setTransition(() => TransitionUp);
        setOpen(true);
    };
 
    const handleClose = () => {
      setOpen(false);
    }; 
    
    const getvalueHandler = (e) => {
      setPasswords({
          ...passwords,
          [e.target.name]:e.target.value
      })
    }    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoad(true)
        const url = `${HOST_URL}/rest-auth/password/reset/confirm/`;
        axios.post(url ,passwords)
            .then(resp=>{
                setMssg('Password changed successfully.')
                handleClick();
                setLoad(false)
            })
            .catch(error=>{
                setLoad(false)
                if (error.response.data.new_password2){
                setMssg(error.response.data.new_password2[0])
                }
                else if (error.response.data.token){
                setMssg('Link expired.')
                }
                else{
                    setMssg('An error occurs.')
                }
                handleClick();
            })
    }
    
    return(
        <section className={classes.root}>
            <div className={classes.container}>
                <div className={classes.content}>
                <Typography variant='h4' className={classes.heading} id='instagramtext' >
                        Instagram
                    </Typography>
                <Typography variant='h4' className={classes.headingStyle}>
                    Change Password
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Input
                    label = 'New Password'
                    name='new_password1'
                    value= {passwords.new_password1}
                    onChange= {getvalueHandler}
                    type='password'
                    />                
                    <Input
                    label = 'Confirm New Password'
                    name='new_password2'
                    value= {passwords.new_password2}
                    onChange= {getvalueHandler}
                    type='password'
                    /> 
                    
                    <Button 
                    type='submit' 
                    variant="contained" 
                    className={classes.btnstyle}
                    size='small'

                    style={{backgroundColor:'#0095f6', color:'white'}}
                    >
                    { load ?
                    <Loader style={{marginTop:'0.5rem', marginBottom:'auto'}} type="Bars" color="white" height={20} width={20} />
                    :
                    'change password'
                    }
                    </Button>               
                </form>
                </div>
            </div>
            {open &&
            <AlertBox open={open} close={handleClose} mssg={mssg} transition={transition}/>
            }            
        </section>
        );
};

export default ResetPassword;


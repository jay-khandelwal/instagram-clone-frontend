import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Loader from "react-loader-spinner";
import Slide from '@material-ui/core/Slide';
import Input from '../Components/Global/InputField';
import Divider from '../Components/Registration/Global/Divider';
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
        fontSize:'20px',
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
    }    
}));

const ForgotPassword = (props) => {
    const classes = useStyles();
    const [data, setData] = useState();
    const [load, setLoad] = useState(false);
    const [mssg, setMssg] = useState();
    const [transition, setTransition] = useState(undefined);
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setTransition(() => TransitionUp);
        setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    }; 
    
    const handleSubmit = e => {
        e.preventDefault()
        setLoad(true)
        const url = `${HOST_URL}/rest-auth/password/reset/`
            axios.post(url ,{'email':data})
            .then(resp=>{
                setMssg(`We have sent an email to ${data} with a link to get back your account`)
                setLoad(false)
                handleClick();
            })
            .catch(error=>{
                if (error.response.data.email){
                    setMssg(error.response.data.email[0])
                }
                else{
                    setMssg('An error occurs.')
                }
                setLoad(false)
                handleClick();
            })
    }
    
    return(
        <section className={classes.root}>
            <div className={classes.container}>
                <div>
                <LockOutlinedIcon className={classes.lockStyle}/>
                <Typography variant='h5' className={classes.headingStyle}>
                    Trouble Logging In?
                </Typography>
                <span className={classes.textStyle}>
                    Enter your email, phone, or username and we'll send you a link to get back into your account.
                </span>
                </div>
                
                <form onSubmit={handleSubmit} style={{marginTop:'1rem'}}>
                    <Input
                    label = 'Email'
                    name='email'
                    type='text'
                    value={data}
                    onChange={(e)=>setData(e.target.value)}
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
                    'send login link'
                    }
                    </Button>                     
                    
                </form>
                <Divider/>
             
                <div className='' >
                    <Typography variant='overline' align='center'>
                        <Link 
                        style={{color:'#000000', fontWeight:'500'}}
                        component={NavLink}
                        to='/signup'
                        > 
                         Create New Account
                        </Link>
                 
                    </Typography>
                </div>                
            </div>
            {open &&
            <AlertBox open={open} close={handleClose} mssg={mssg} transition={transition}/>
            }
        </section>
        );
};


export default ForgotPassword;

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loader from "react-loader-spinner";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { HOST_URL } from "../Settings";
import RegistrationErrorDialogBox from '../Components/Registration/RegistrationErrorDialogBox';


const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        boxSizing:'border-box',
        overflow:'hidden',
        '@media (max-width:768px)':{
            backgroundColor:'white'
        }        
    },
    container:{
        width:'100%',
        boxSizing:'border-box',
        alignSelf:'center',
        position:'relative',
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
    btnstyle:{
        width:'80%',  
        margin:'0.4rem',
        marginTop:'0.8rem'
    },
    heading:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        borderBottom:'1px solid #6565653c',
        padding:'0.6rem',
    },
    title:{
        marginTop:'0.5rem',
        marginBottom:'0.5rem',
        fontSize:'18px'
    },
    text:{
        color:'gray'
    },
    overview:{
        padding:'0.8rem',
        '& p':{
            color:'#38383897'
        }
    },
    btn:{
        borderTop:'1px solid #83838355'
    },    
}));

const ConfirmEmailVerify = (props) => {
    const classes = useStyles();
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [resp, setResp] = useState(false);
    
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    }; 
    
    
    const handleSubmit = e => {
        setLoad(true)
        e.preventDefault()
        const url = `${HOST_URL}/rest-auth/registration/verify-email/`
            axios.post(url ,{'key':props.match.params.key})
            .then(resp=>{
                setLoad(false)
                setResp(true)
                setOpen(true)
            })
            .catch(error=>{
                setLoad(false)
                setError(true)
                setOpen(true)
            })
    }
    
    return(
        <section className={classes.root}>
            <div className={classes.container}>
              
                <div className={classes.content}>
                    <Typography variant='h4' className={classes.heading} id='instagramtext' >
                        Instagram
                    </Typography>
                    <Typography variant='h5' className={classes.title}>
                        Confirm Your Email
                    </Typography>
                    <Typography variant='caption' className={classes.text}>
                        click on the confirm button if this account is yours, else ignore this mail
                    </Typography>
                    <Button 
                    type='submit' 
                    variant="contained" 
                    className={classes.btnstyle}
                    size='small'
                    onClick={handleSubmit}
                    style={{backgroundColor:'#0095f6', color:'white'}}
                    >
                    { load ?
                    <Loader style={{marginTop:'0.5rem', marginBottom:'auto'}} type="Bars" color="white" height={20} width={20} />
                    :
                    'Confirm'
                    }
                    </Button>                                 
                </div>
            </div>
            {open &&
            <RegistrationErrorDialogBox open={open} close={handleClose} >
                {resp &&
                <>
                <div style={{paddingTop:'0.8rem', paddingBottom:'0.8rem'}}>
                    <CheckCircleOutlineIcon style={{width:'50px', height:'50px'}}/>
                    <Typography variant='h6' component='h6' style={{fontWeight:'500', fontSize:'20px', paddingLeft:'0.4rem', paddingRight:'0.4rem'}}>
                        Verification Completed 
                    </Typography>     
                   <Typography variant='caption' component='p' style={{paddingLeft:'0.8rem', paddingRight:'0.8rem'}} >
                       Your account is verified, know you are able to login. Thank you
                   </Typography>                    
                </div>        
                <div className={classes.options}>
                    <Button fullWidth={true} component={Link} to='/login' className={classes.btn}>
                        Login
                    </Button>
                </div>   
                </>
                }
                {error &&
                <>
                <div className={classes.overview}>
                    <Typography variant='h6' component='h6' style={{fontWeight:'500'}}>
                        Invalid Link
                    </Typography>
                    
                    <Typography variant='caption' component='p' >
                        Link expires or tampered
                    </Typography>
                </div>
                <div className={classes.options}>
                    <Button fullWidth={true} component={Link} to='/accounts/verify-email' className={classes.btn}>
                        Re-send email
                    </Button>
                </div>          
                </>
                }
            </RegistrationErrorDialogBox>
            }
        </section>
        );
};

export default ConfirmEmailVerify;

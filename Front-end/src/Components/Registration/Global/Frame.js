import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import Link from '@material-ui/core/Link';
import { NavLink } from "react-router-dom";
//import GoogleLogin from 'react-google-login';

import Divider from './Divider';

const useStyles = makeStyles((theme) => ({
    root:{
        minHeight:'100%',
        paddingBottom:'30px',
        '@media (max-width:768px)':{
            backgroundColor:'white'
        }
    },
    heading:{
        padding:'0.8rem'
    },
    gridone:{
        width:'100%',
        backgroundColor:'white',
        border:'1px solid #c1c1c16f',
        margin:'0.4rem',
        textAlign:'center',
        [theme.breakpoints.down('xs')]: {
            border:'none'
        },
        '@media (min-width:450px)':{
            maxWidth:'350px',
        }        
    },
    gridtwo:{
        padding:'0.7rem'
    },
    errorText:{
        color:'red',
        fontSize:'12px',
    }
}));

const FormFrame = (props) => {
    const classes = useStyles();
    
/*    
    const responseGoogler = (response) => {
        console.log('success')
      console.log(response);
    }
    const responseGooglee = (response) => {
        console.log('error')
      console.log(response);
    }
    */
    
    return(
        
        <Grid container
        justify='center' 
        alignContent='center'  
        direction='column'
        className = {classes.root}
        >
        
        <Grid item  className={classes.gridone}>
            <Typography variant='h3' className={classes.heading} id= 'instagramtext'>
                Instagram
            </Typography>
            
            {props.children}
            
            <Divider/>
    
            <Button variant="contained" size='small' style={{width:'80%', margin:'0.8rem 10%', backgroundColor:'#0095f6', color:'white' }}>
                <FacebookIcon/> {props.fbbtn}
            </Button>
            
         {/*   <GoogleLogin
              clientId="96943209751-e7mg8i7ohm5sr6l6ah41t5tk35uuhae0.apps.googleusercontent.com"
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={responseGoogler}
              onFailure={responseGooglee}
            />*/}
        
            { props.login &&
            <>
            <br/>
            <Typography variant='overline' align='center'>
                <Link 
                style={{color:'#009cfde8'}}
                component={NavLink} 
                to='/accounts/password/reset/'
                > 
                 Forgot password ?
                </Link>
            </Typography>       
            </>
            }
            
        </Grid>
        <Grid item className={`${classes.gridone} ${classes.gridtwo}`} >
            <Typography variant='overline' align='center'>
                {props.bottomline}
                <Link 
                style={{color:'#009cfde8'}}
                component={NavLink}
                to={props.url}
                > 
                 {props.linktext} 
                </Link>
         
            </Typography>
        </Grid>
        
        </Grid>
        
        );
}


export default FormFrame;

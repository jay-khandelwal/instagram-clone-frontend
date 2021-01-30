import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    root:{
      width:'100%',
      height:'100%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      msTransform: 'translateX(-50%) translateY(-50%)',
      webkitTransform: 'translate(-50%,-50%)',
      transform: 'translate(-50%,-50%)',
      textAlign:'center',        
      backgroundColor:'white',
      zIndex:1000000,
      display:'flex',
      justifyContent:'center',
      alignContent:'center'
    },
    container:{
      width:'80%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      msTransform: 'translateX(-50%) translateY(-50%)',
      webkitTransform: 'translate(-50%,-50%)',
      transform: 'translate(-50%,-50%)',
    },
    text:{
        fontSize:'14px',
        fontWeight:'400',
    },
    bar:{
     backgroundColor:'white',
     position:'fixed',
     width:'100%',
     textAlign:'center',
     top:0,
     left:0,
     borderBottom:'1px solid #6565653c',
     zIndex:'5'
    },        
}));

const NetworkError = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
        <Toolbar className={classes.bar}>
            <Typography
            id= 'instagramtext'
            variant="h4" 
            >
            Instagram
            </Typography>
        </Toolbar>                
            <div className={classes.container}>
            <Typography variant='h5' >
                Network Error
            </Typography>
            <Typography className={classes.text}>
                Check your internet connection and refresh the page.
            </Typography>
            </div>
        </div>
        );
}

export default NetworkError;
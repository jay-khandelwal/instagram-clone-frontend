import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root:{
        width:'80%',
        height:'auto',
        textAlign:'center',
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.up('md')]:{
            width:'50%'
        }      
    },
    iconstyle:{
        margin:'1rem auto',
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor:'inherit',
        color:'black',
        fontSize:'5rem',
        border:'1px solid black'
    },
}));


const MessageIcon = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
        
           <Avatar
            className={classes.iconstyle}
            >
              <NearMeOutlinedIcon />
           </Avatar> 
           
          <Typography component="h5" variant="h5">
            Your Messages
          </Typography>
          
          <Typography variant="subtitle1" color="textSecondary">
            Send private messages to a friend or group.
          </Typography>   
          
          <Button component={Link} to={{pathname: "/direct/new",state: { isModal: true }}} variant="contained" style={{ backgroundColor:'#009cfde8', color:'white', margin:'0.8rem auto' }}>
                Send Message
          </Button>
          
        </div>
        );
}

export default MessageIcon;
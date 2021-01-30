import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    root:{
     backgroundColor:'white',
     borderBottom:'1px solid #6565653c',
     borderRadius:'0px',
     [theme.breakpoints.down('sm')]:{
         display:'none'
     }
    },
    grow: {
      flexGrow: 1,
    },
    avatarStyle:{
        margin:'auto 0.3rem',
        backgroundColor:'black'
    },
    icontwo:{
        border:'3px solid gray',
        color:'gray',
        padding:'1px'
    },
}));

const ChatAppbar = (props) => {
    const classes = useStyles();
    return(
        <Toolbar className={classes.root} component={Paper} elevation={0}  >
                { !props.loading ?
                <>
                <div style={{padding:'0.6rem'}}>
                <Avatar aria-label="altalt" src={props.profile_pic}/>
            {/*    <UserBadge profile_pic={props.profile_pic}/>*/}
                </div>
                <div>
                <Typography component="h5" variant="h6" >
                    {props.full_name}
                </Typography>
              {/*  <span>active</span>*/}
                </div>
                <div className={classes.grow}/>
                <IconButton className={classes.icontwo} onClick={()=>props.setOpen(true)}>
                    <PriorityHighRoundedIcon />
                </IconButton>
                </>
                :
                <>
                <Skeleton variant="circle">
                <Avatar/>
                </Skeleton>
                <Skeleton width="50%" style={{margin:'1rem'}}>
                    <Typography>.</Typography>
                </Skeleton>
                </>
                }
        </Toolbar>        
        );
}

export default ChatAppbar;
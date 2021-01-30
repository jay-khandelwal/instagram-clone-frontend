import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme)=>({
    root:{
        maxWidth:'300px',
        textAlign:'center'
    },
    overview:{
        padding:'1.4rem 0.6rem',
        '& p':{
            color:'#38383897'
        }
    },
    avroot:{
     //   backgroundColor:'red',
        margin:'0.5rem auto',
    },
    avatar:{
        margin:'auto',
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    btn:{
        borderTop:'1px solid #83838355'
    }
}))

const FollowPopup = (props) => {
    const classes = useStyles();
    
    
    return(
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >  
        <div className={classes.root}>
            <div className={classes.overview}>
                <div className={classes.avroot}>
                <Avatar aria-label="recipe" className={classes.avatar} src={props.profile_pic}/>
                </div>
            <Typography variant='caption' component='p' >
                Are you sure ? you want to unfollow {props.username}
            </Typography>
            </div>
            <div className={classes.options}>
                <Button fullWidth={true} className={classes.btn} style={{color:'tomato'}} onClick={props.unfollowHandler}>
                    Yes! unfollow
                </Button>
                <Button fullWidth={true} onClick={props.close} className={classes.btn}>
                    No! take me back
                </Button>
            </div>
        </div>
        </Dialog>
        );
}


export default FollowPopup;
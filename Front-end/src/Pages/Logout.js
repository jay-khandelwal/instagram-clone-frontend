import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as actions from '../Store/Actions/Auth';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme)=>({
    root:{
        maxWidth:'300px',
        textAlign:'center'
    },
    overview:{
        padding:'0.8rem 0.5rem',
        '& p':{
            color:'#38383897'
        }
    },
    btn:{
        borderTop:'1px solid #83838355'
    }
}))

const Logout = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const handleLogout = () => {
        props.onLogout(props.token)
        history.push('/')
        props.close()
    }
    
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
            <Typography variant='h6' component='h6' style={{fontWeight:'500'}}>
                Logout ?
            </Typography>
            <Typography variant='caption' component='p' >
                Are you sure you want to logout ?
            </Typography>
            </div>
            <div className={classes.options}>
                <Button fullWidth={true} onClick={handleLogout} className={classes.btn} style={{color:'#f82929'}}>
                    Yes! logout
                </Button>
                <Button fullWidth={true} onClick={props.close} className={classes.btn}>
                    No! take me back
                </Button>
            </div>
        </div>
        </Dialog>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onLogout : (token) => 
            dispatch(actions.logout(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomAppbar from '../Components/Global/CustomAppbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import * as actions from '../Store/Actions/Auth';
import Logout from './Logout';

const useStyles = makeStyles((theme) => ({
    root:{
       width:'100%',
       height:'100%',
       paddingTop:'4rem',
       backgroundColor:'white',
    },
    contentStyle:{
        margin:'0.4rem 1rem',
    },
    title:{
        borderBottom:'1px solid #6565653c',
        paddingLeft:'6px',
        color:'gray',
        textAlign:'center'
    },
    btnstyle:{
        borderRadius:'0px',
    }
}));


const BaseStructure = (props) => {
    const classes = useStyles();
    
    return(
        <div className={classes.contentStyle}>
            <Typography variant='h6' className={classes.title}>
                {props.title}
            </Typography>
            {props.children}
        </div>
        );
}

const SettingPage = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    }; 
    
   
    
    return(
        <>
        <CustomAppbar heading='Settings' />        
        <div className={classes.root}>
        <BaseStructure 
        title='Accounts' 
        >
            <Button fullWidth={true} className={classes.btnstyle} component={NavLink} to='/accounts/edit' >
                 Edit Profile
            </Button>        
            <Button fullWidth={true} className={classes.btnstyle} component={NavLink} to='/accounts/password/change' >
                 Change Password
            </Button>        
            <Button fullWidth={true} className={classes.btnstyle} component={NavLink} to='/accounts/privacy' >
                 Privacy and Security
            </Button>        
            <Button fullWidth={true} className={classes.btnstyle} style={{color:'#f82929'}} onClick={handleClickOpen} >
                 Logout
            </Button>        
        </BaseStructure>
        </div>
    
        <Logout open={open} close={handleClose} />
        
        </>
        );
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout : () => 
            dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(SettingPage);
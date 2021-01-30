import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    btnstyle:{
        borderRadius:'0px',
    },
    btnText:{
        width:'100%',
        textAlign:'left',
        padding:'0.5rem 0.5rem',
    },
    activeClass:{
        fontWeight:900,
        borderLeft:'5px solid black'
    }
}));

const EditSideBar = () => {
    const classes = useStyles();
    return(
        <div>
            <Button fullWidth={true} className={classes.btnstyle} component={NavLink} to='/accounts/edit' activeClassName={classes.activeClass}>
                 <span className={classes.btnText}>Edit Profile</span>
            </Button>        
            <Button fullWidth={true} className={classes.btnstyle} component={NavLink} to='/accounts/password/change' activeClassName={classes.activeClass}>
                 <span className={classes.btnText}>Change Password</span>
            </Button>        
            <Button fullWidth={true} className={classes.btnstyle} component={NavLink} to='/accounts/privacy' activeClassName={classes.activeClass}>
                <span className={classes.btnText}> Privacy and Security</span>
            </Button>        
        </div>
        );
}

export default EditSideBar;
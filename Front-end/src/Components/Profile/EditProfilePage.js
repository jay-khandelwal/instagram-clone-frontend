import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";


import EditSideBar from './Global/EditSideBar';
import EditForm from './Global/EditForm';
import PrivacyPage from './Global/PrivacyPage';
import ChangePassword from './Global/ChangePassword';
import Appbar from '../Global/Navbar';
import CustomAppbar from '../Global/CustomAppbar';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        boxSizing:'border-box',
        backgroundColor:'white',
        paddingTop:'60px',
        paddingBottom:'60px',
        zIndex:100,
        position:'relative',
        '@media (min-width:768px)':{
            padding:'0.6rem',
            paddingTop:'70px',
        }
    },
    container:{
        display:'flex',
        width:'100%',
        maxWidth:'935px',
        minHeight:'80vh',
        position:'relative',
        '@media (min-width:768px)':{
            border:'1px solid #6565653c',
            margin:'auto',
        }
    },
    gridOne:{
        width:'236px',
        minWidth:'236px',
        borderRight:'1px solid #6565653c',
        '@media (max-width:768px)':{
            display:'none'
        }
    },
    gridTwo:{
        width:'100%',
        padding:'1rem',
        position:'relative',
    }
}));

const EditProfilePage = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));
    
    const {location} = props
    const edit = (location.pathname.includes('/accounts/edit') ? true : false)
    const privacy = (location.pathname.includes('/accounts/privacy') ? true : false)
    const password = (location.pathname.includes('/accounts/password') ? true : false)
    return(
        <section className={classes.root}>
        { upMd ?
        <Appbar/>
        :
        <CustomAppbar heading={(privacy && 'Privacy') || (edit && 'Edit Profile') || (password && 'Change Password')}/>
        }

        <div className={classes.container}>
        { upMd &&
            <div className={classes.gridOne}>
                <EditSideBar/>
            </div>
        }
            <div className={classes.gridTwo}>
                <Route exact path='/accounts/edit' component={EditForm}/>
                <Route exact path='/accounts/privacy' component={PrivacyPage}/>
                <Route exact path='/accounts/password/change' component={ChangePassword}/>
            </div>
        </div>
        </section>
        );
}

export default withRouter(EditProfilePage);
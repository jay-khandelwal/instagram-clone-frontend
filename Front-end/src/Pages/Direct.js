import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Direct from '../Components/Direct/Direct';
import Appbar from '../Components/Global/Navbar';
import MessageIcon from '../Components/Direct/Global/MessageIcon'; 
import MobileChatPage from '../Components/Chat/MobileChatPage'; 
import MessagedUsers from '../Components/Direct/Global/MessagedUsers';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%', 
        position:'relative', 
        paddingTop:'70px', 
        boxSizing:'border-box',
        '@media (max-width:768px)':{
            paddingBottom:'75px',
            backgroundColor:'white',
        }
    }
}));

const Directs = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));
    const {location} = props
    const chat = (location.pathname.includes('/direct/chat') ? true : false)
    
    useEffect(()=>{
        if (!props.token){
            history.push('/login')
        }
    }, [props.token, history])
    
    if (upMd) {
    return(
        <section className={classes.root}>
            <Appbar />
            <Direct chat={chat}>
                <Route exact path='/direct/inbox' component={MessageIcon} />
                <Route exact path='/direct/chat/:id' component={MobileChatPage} />
            </Direct>
        </section>
        );        
    }
   
    if (!upMd) {
    return(
        <section className={classes.root}>
             <Route exact path='/direct/inbox' component={MessagedUsers} />
            <Route exact path='/direct/chat/:id' component={MobileChatPage} upmd={false} />               
        </section>
        );
    }
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(withRouter(Directs));

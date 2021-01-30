import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root:{
     backgroundColor:'white',
     position:'fixed',
     width:'100%',
     textAlign:'center',
     top:0,
     left:0,
     borderBottom:'1px solid #6565653c',
     zIndex:'5'
    },
    iconone:{
        padding:'8px',
        position:'absolute',
        left:4,
    },   
    text:{
        margin:'auto',
        fontWeight:500,
    }
}));

const CustomAppbar = (props) => {
    const classes = useStyles();
    const history = useHistory();
    return(

        <Toolbar className={classes.root}>
                <IconButton className={classes.iconone} onClick={() => history.goBack()}>
                    <ArrowBackIosIcon />
                </IconButton> 
                <Typography component="h5" variant="h6" className={classes.text}  >
                    {props.heading}
                </Typography>
                {props.children}
        </Toolbar>
    
        );
}

export default CustomAppbar;
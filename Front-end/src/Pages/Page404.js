import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
        paddingTop:'100px',
        textAlign:'center'
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

const Page404 = () => {
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
            <Typography variant='h5'>
                Sorry, this page isn't available.
            </Typography>
            <Typography variant='body2' style={{marginTop:'0.6rem'}}>
                The link you followed may be broken, or the page may have been removed. <Link to='/'> Go back to Instagram.</Link>
            </Typography>
        </div>
        )
}

export default Page404;
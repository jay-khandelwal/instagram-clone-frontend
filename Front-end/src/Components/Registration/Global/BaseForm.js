import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    btnstyle:{
        width:'80%', 
        margin:'0.8rem 10%', 
    }
}));

const BaseForm = (props) => {
    
    const classes = useStyles();
    return(
        

        <form onSubmit={props.formHandler}>
            
                {props.children}

            <Button 
            type='submit' 
            variant="contained" 
            className={classes.btnstyle}
            size='small'
            style={{backgroundColor:'#0095f6', color:'white'}}
            >
                { props.submited ?
                <CircularProgress size={24} className={classes.buttonProgress} color='whitee' />   
                :
                props.btnName
                }
            </Button>       

        </form>

        );
}

export default BaseForm;



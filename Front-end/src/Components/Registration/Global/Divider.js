import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root:{
        width:'80%',
        margin:'0.8rem 10%'
    },
    divider:{
        position:'relative',
        bottom:'4px',
        color:'#8e8e8e',
        fontSize:'13px',
        fontWeight:600,
    }
});

const Divider = () => {
    const classes = useStyles();
    return(
        <>
            <Grid container alignContent='center' justify='center' className={classes.root}> 
            
                <Grid item xs={5} >
                    <hr />
                </Grid>
                
                <Grid item xs={2}>
                <span className={classes.divider} >
                    OR
                </span>
                </Grid>
                
                <Grid item xs={5}>
                  <hr/>
                </Grid>
                
            </Grid>   
        </>
        );
}

export default Divider;

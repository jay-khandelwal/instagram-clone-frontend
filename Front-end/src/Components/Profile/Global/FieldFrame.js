import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container:{
        width:'100%',
    },
    fieldContent:{
        marginBottom:'1rem',
    },
    fieldlabel:{
        fontSize:'14px',
      [theme.breakpoints.up('md')]:{
          textAlign:'right',
          float:'right',
          paddingRight:'0.8rem'
      }        
    },
    inputfield:{
        marginBottom:'0.7rem',
        '& .MuiOutlinedInput-input':{
            padding:'6px'
        }
    },
}));

const Fields = (props) => {
    const classes = useStyles();
       
    return(
        <Grid container className={classes.fieldContent} >
            <Grid item xs={12} md={3} className={classes.text}>
            <Typography variant='subtitle2' className={classes.fieldlabel} >
                {props.label}
            </Typography>
            </Grid>
            <Grid item xs={12} md={8} className={classes.field}>
            { props.children ?
            props.children :
            <>
            <TextField 
            variant="outlined" 
            name={props.name}
            value={props.value || ''}
            onChange={props.onChange}
            className={classes.inputfield} 
            fullWidth={true} 
            type={props.type || 'text'}
            multiline={props.bio ? true : false}
            />
            { props.detail ?
            <Typography variant='caption'>
                {props.detail}
            </Typography>
            :
            null
            }
            </>
            }
            </Grid>
            <Grid item xs />
        </Grid>
        );
}

export default Fields;
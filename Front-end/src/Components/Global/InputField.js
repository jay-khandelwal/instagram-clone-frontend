import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, fade } from '@material-ui/core/styles';

const useStylesReddit = makeStyles((theme) => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

const useStyles = makeStyles((theme) => ({
  margin: {
    width:'80%',
    margin:'0.5rem 10%',
  },
}));

function RedditTextField(props) {
  const classes = useStylesReddit();

  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const Input = (props) => {
    const classes = useStyles();
    return(
      <RedditTextField
        required
        className={classes.margin}
        variant="filled"
        size='small'
        label= {props.label}
        name= {props.name}
        value= {props.value}
        onChange= {props.onChange}
        type={props.type}
      />
        );
}

export default Input
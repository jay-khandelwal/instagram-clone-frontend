import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position:'fixed',
    top:0,
    left:0,
    zIndex:100
  },
}));

const LoadBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color='secondary' style={{backgroundImage: 'linear-gradient(to right, #833ab4, #b123a4, #d3008c, #eb0070, #f90051, #fe2941, #ff412f, #fe5618, #fe711b, #fd8825, #fd9d33, #fcb045)',}} />
    </div>
  );
}

export default LoadBar;


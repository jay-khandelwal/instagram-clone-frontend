import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
    loader: {
        position:'fixed',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
  },    
}));

const Looader =(props) => {
  const classes = useStyles();

  return (
      <Loader 
      className={classes.loader} 
      type={props.type ? props.type : "TailSpin"} 
      color='#b4b4b4' 
      height={40} 
      width={40} 
      {...props}
      /> 
  );
}

export default Looader;

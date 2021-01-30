import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import MyAvatar from './MyAvatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width:'100%',
      display: 'flex',
      overflowX:'scroll',
      backgroundColor:'white',
      textAlign:'center',
      padding:'0.4rem',
      '@media (min-width:604px)':{
            border:'1px solid #6565653c',
            marginBottom:'20px',
      },
      '@media (min-width:768px)':{
          marginBottom:'1rem',
      },
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);


export default function ImageAvatars() {
  const classes = useStyles();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  if (upMd){
      return(
    <div className={`${classes.root} noscrollbar`}>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
    </div>          
          )
  }
  else{
      return(
    <Card className={`${classes.root} noscrollbar`}>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
        <MyAvatar/>
    </Card>      
    );
  }

}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MyCard from './Global/Card';
import CustomAppbar from '../Global/CustomAppbar';
import BottomBar from '../Global/BottomBar';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
        paddingTop:'57px',
        backgroundColor:'white',
        overflowX:'hidden',
        overflowY:'auto',
    },
    root2:{
        width:'100%',
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        paddingBottom:'100px'
    },
    root3:{
        width:'100%',
        maxWidth:'600px',
    }
}));  

const MobileImageCard = (props) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
          <CustomAppbar heading='Photo' />
          <div className={classes.root2}>
              <div className={classes.root3}>
                  <MyCard slug={props.slug} />
              </div>
          </div>
          <BottomBar/>
        </div>
        );
}

export default MobileImageCard;


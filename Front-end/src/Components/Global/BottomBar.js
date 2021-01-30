import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import { NavLink, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';

import * as profileActions from '../../Store/Actions/Profile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      backgroundColor:'white',
      color:'black',
      [theme.breakpoints.up('md')]:{
          display:'none'
      }      
    },
    bticon:{
        width:'20%',
        textAlign:'center'
    },
  }),
);

const BottomAppBar =(props) => {
  const classes = useStyles();
  const history = useHistory();
  const handlePostImage = (e) => {
      const image = e.target.files[0]
      console.log(image)
      props.UploadImageFile(image)
      history.push('/create/detail')
  }
  
  return (
    <div >
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
        
        <Grid container className={classes.cnt} >
        
          <div  className={classes.bticon} >
          <IconButton color="inherit" component={NavLink} to='/'>
            <HomeIcon />
          </IconButton>
          </div>
          
          <div className={classes.bticon}>
          <IconButton color="inherit" component={NavLink} to='/explore' >
            <SearchIcon />
          </IconButton>
          </div>
          
            <input
                type="file"
                accept="image/png, image/jpeg"
                name='image'
                id="contain-button-file"
                onChange={handlePostImage}
                style={{display:'none'}}
            />  
            <div className={classes.bticon}>
            <label htmlFor="contain-button-file">
            <IconButton component='span' color='inherit'>
                <AddIcon />
            </IconButton>
            </label>                      
            </div>
          
          <div className={classes.bticon}>
          <IconButton color="inherit" component={NavLink} to='/activity'>
          <Badge badgeContent={props.maincount} invisible={props.maincount===0 ? true : false} color="secondary">
          <FavoriteBorderIcon/>
          </Badge>
          </IconButton>
          </div>
          
          <div className={classes.bticon}>
          <IconButton color="inherit" component={NavLink} to={`/${props.username}`}>
          <AccountCircleIcon/>
          </IconButton>
          </div>
          
        </Grid>
        
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return{
        UploadImageFile: (imageFile) =>
            dispatch(profileActions.uploadedImage(imageFile)),
    }
}

const mapStateToProps = state => {
    return{
        username:state.auth.username,
        maincount:state.notifications.maincount,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomAppBar);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles((theme) => ({
    image:{
      flex:'calc(33.33% - 2px)',
      maxWidth:'calc(33.33% - 2px)',
      overflow: 'hidden',
      cursor: 'pointer',
      paddingTop:'calc(33.333% - 2px)',
      position:'relative',
      marginBottom:'3px',
      marginRight:'3px',
      '@media (min-width: 768px)':{
          marginBottom:'25.5px',
          marginRight:'25.5px',
          flex:'calc(33.33% - 17px)',
          maxWidth:'calc(33.33% - 17px)',
          paddingTop:'calc(33.333% - 17px)',
      },
    },
    imge:{
        width:'100%',
        height:'100%',
        objectFit:'cover',
        left:0,
        top:0,
        position:'absolute'
    }
}));


const GridImg = (props) => {
    const classes = useStyles();
    return(
          <ButtonBase focusRipple className={`${classes.image} kskdk`} component={Link} to={{
                pathname: `/p/${props.slug}`,
                state: { imagePopup: true }
                }} >
            <img className={classes.imge} src={props.image} alt="nddnfm" />
          </ButtonBase>     
        );
}

export default GridImg;
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import ButtonBase from '@material-ui/core/ButtonBase';

import CardDialogBox from '../../Home/CardDialogBox';

const useStyles = makeStyles((theme) => ({
    root:{
     width:'100%',
     backgroundColor:'white',
     borderBottom:'1px solid #8a8a8a73',
     padding:'0px',
     position:'absolute',
     zIndex:3,
     [theme.breakpoints.down('sm')]:{
         display:'none'
     }
    },
    grow: {
      flexGrow: 1,
    },
    avatar:{

    },
    icontwo:{

    },
}));

const ProfileBar = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    
    return(
        <>
        <Toolbar className={classes.root} component={Paper} elevation={0}  >
        
                <div style={{padding:'0.4rem 0.6rem'}}>
                    <Avatar aria-label="recipe" className={classes.avatar} src={props.profile_pic}/>
                </div>
                <ButtonBase component={Link} to={`/${props.username}`}> 
                   {props.username}
                </ButtonBase>
                <div className={classes.grow}/>
                { props.owner &&
                <IconButton className={classes.icontwo}>
                    <MoreHorizIcon onClick={handleClickOpen} />
                </IconButton>
                }
        </Toolbar>
        {open &&
        <CardDialogBox open={open} onClose={handleClose} slug={props.slug} caption={props.caption} setCaption={props.setCaption} />
        }                
        </>
        );
}

export default ProfileBar;
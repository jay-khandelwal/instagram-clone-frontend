import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ProfilePicDialogBox from './ProfilePicDialogBox';


const useStyles = makeStyles((theme)=>({
    root:{
        display:'flex',
        width:'100%',
        padding:'0.6rem 0rem',
        [theme.breakpoints.up('md')]:{
            marginLeft:'15%',
        }        
    },
    text:{
        margin:'auto 1.2rem',
        '& h5':{
            fontWeight:'400'
        },
        '& button':{
            color:'#0095f6',
            fontWeight:600,
            padding:'0px'
        }
    },
    avatarstyle:{
        margin:'auto 0px',
        padding:'0.3rem',
    }
}))

const IconAndName = (props) => {
    const classes = useStyles();
    const [profile_pic, setProfile_pic] = useState(props.profile_pic);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };   
    
    useEffect(()=>{
        setProfile_pic(props.profile_pic)
    }, [props.profile_pic])
    
    return(
        <>
        <div className={classes.root}>
            <div className={classes.avatarstyle}>
            <Avatar alt="Remy Sharp" src={profile_pic} className={classes.large} /> 
            </div>
            <div className={classes.text}>
                <Typography variant='h6' component='h5'>
                    {props.name}
                </Typography>
                <Button color="secondary" onClick={handleClickOpen}>Change Profile Photo</Button>
            </div>
        </div>
        {open &&
        <ProfilePicDialogBox 
        open={open} 
        onClose={handleClose} 
        profile_pic={profile_pic}
        changeProfilePic={setProfile_pic}
        username={props.name}
        />
        }
        </>
        );
}



export default IconAndName;
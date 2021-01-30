import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ButtonBase from '@material-ui/core/ButtonBase';
import axios from 'axios';
import { NavLink, Link } from "react-router-dom";
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';

import { HOST_URL } from "../../../Settings";
import CardDialogBox from '../CardDialogBox';

const useStyles = makeStyles((theme) => ({
  root_root:{
      '@media (max-width:768px)':{
          padding:'0.8rem', 
      }      
  },
  root: {
    backgroundColor:'white',
    marginBottom:'0.8rem',
    width:'100%',
    [theme.breakpoints.up('sm')]:{
           marginBottom:'0.8rem',
     },
    '@media (min-width:604px)':{
         border:'1px solid #6565653c'
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    '& img':{
        width:'100%',
        height:'auto'
    }
  },
  imageField:{
      width:'auto',
      maxWidth:'100%',
      overflow:'hidden',
      height:'auto',
      position:'relative',
      '& img':{
          maxWidth:'100%',
          height:'100%',
          width:'100%',
          display:'block',
          objectFit:'contain',
          '@media (min-width:600px)':{
              maxHeight:'600px',
          }
      }
  },
  avatar: {
    width:theme.spacing(4),
    height:theme.spacing(4)
  },
  likeBtn:{
      color:'#ff007e'
  },
  card: {
      width:'100%',
      marginBottom: theme.spacing(2),
  },
  mediask: {
    height: 190,
    '@media (min-width:768px)':{
        height:400,
    }
  },
  savedStyle:{
      color:'black'
  },
  iconStyle:{
      padding:'4px 0.8rem 4px 2px',
  },
  displayNone:{
      display:'none'
  }
}));

const CommonCard = (props) => {
    const classes = useStyles();
    const [liked, setLiked] = useState(props.liked || false)
    const [likes, setLikes] = useState(props.likes || false)
    const [saved, setSaved] = useState(props.saved || false)
    const [caption, setCaption] = useState(props.caption || '')
    const [animate, setAnimate] = useState(false)
    const [open, setOpen] = useState(false);
    const [isDeleted, setIsDeteted] = useState(false);
 
    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    }; 
 
    const likeBtnHandler = () => {
        const url = `${HOST_URL}/posts/post/like/`
        axios.post(url, {slug:props.slug, liked: liked}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            if (liked){
                setLiked(false)
                setLikes(likes - 1)
            }
            if (!liked){
                setLiked(true)
                setLikes(likes+1)
            }
        })
        .catch(error=>{
        })
    } 
    
    const onlyLikeHandler = () =>{
        setAnimate(true)
        if (!liked){
           const url = `${HOST_URL}/posts/post/like/`
            axios.post(url, {slug:props.slug, liked: liked}, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp=>{
                if (!liked){
                    setLiked(true)
                    setLikes(likes+1)
                }
            })
            .catch(error=>{
            })
        }
    }
    
    const saveBtnHandler = () => {
        const url = `${HOST_URL}/posts/save/`

        axios.post(url, {slug:props.slug, saved: saved}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            if (saved){
                setSaved(false)
            }
            if (!saved){
                setSaved(true)
            }
        })
        .catch(error=>{
        })
    }    
    
    return(
        <div sytle={{width:'100%'}} className={isDeleted ? classes.displayNone : ''}>
        
          <CardHeader
          className={classes.cardHeader}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar} src={props.user.profile_pic}/>
            }
            action={
                props.owner &&
              <IconButton aria-label="settings" onClick={handleClickOpen}>
                <MoreVertIcon />
              </IconButton>
            }
            title={
            <ButtonBase component={Link} to={`/${props.user.username}`}> 
            {props.user.username}
            </ButtonBase>
            }
          />
          <div onDoubleClick={onlyLikeHandler} className={classes.imageField}>

            <div className={`icon icon-heart ${animate ? 'like' : ''}`}>
                <Favorite className={classes.likeBtn} fontSize='large' /> 
            </div> 
            
            <img src={props.image} alt='irrifi'/>
          </div>
          <div  style={{padding:'8px 12px', width:'100%'}}>
            
            <IconButton className={classes.iconStyle} disableRipple onClick={likeBtnHandler}>
                {liked &&
                <Favorite className={classes.likeBtn}/>
                }
                { !(liked) &&
                <FavoriteBorder/>
                }
            </IconButton>
           
            <IconButton className={classes.iconStyle} aria-label="comment" component={Link} to={{pathname: `/p/${props.slug}/comments`, state: { isModal: true } }}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton className={classes.iconStyle} aria-label="share">
              <NearMeOutlinedIcon />
            </IconButton>
            <IconButton className={classes.iconStyle} aria-label="share" style={{marginLeft:'auto', float:'right'}} onClick={saveBtnHandler} >
                { saved ?
                <BookmarkOutlinedIcon className={classes.savedStyle} />
                :
                <BookmarkBorderIcon className={classes.savedStyle}/>
                }
            </IconButton>
          </div>
    
          <div style={{padding:'4px 16px'}}>
          
            <ButtonBase component={NavLink} to={{pathname: `/p/${props.slug}/likes`, state: { isModal: true } }}  >
                <Typography variant='caption' component='span' style={{fontSize:'14px'}} >
                     Liked By <b> {likes} </b> People
                </Typography>
            </ButtonBase>
            <br/>
            
            { props.caption !== '' &&
            <Typography variant="caption" component="p" style={{ color:'#000000', fontSize:'14px'}}>
              <b>{props.user.username}</b> {caption}
            </Typography>
            }
            
            <ButtonBase component={NavLink} to={{pathname: `/p/${props.slug}/comments`, state: { isModal: true } }} style={{color:'#808080ac', marginBottom:'1rem'}} >
                <Typography variant='subtitle2' component='span' >
                     View all {props.comments} comments
                </Typography>
            </ButtonBase>        
            <br/>
            <Typography variant='caption' component='span' style={{color:'#808080ac', fontSize:'10px', marginTop:'1rem'}}>
                        {props.timestamp}
            </Typography>
          </div> 
        {open &&
        <CardDialogBox open={open} onClose={handleClose} slug={props.slug} caption={caption} setCaption={setCaption} deleteFunc={setIsDeteted} />
        }
        </div>        
        );
}

export default CommonCard;
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import { Link } from "react-router-dom";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import { connect } from 'react-redux';

import { HOST_URL } from "../../../Settings";
import CardDialogBox from '../../Home/CardDialogBox';
import LoadBar from '../../Global/LoadBar';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius:'0px',
    backgroundColor:'white',
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

}));

const MyCard = (props) => {
  const classes = useStyles();
  
    const [post, setPost] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };  
    
    const setCaption = (data) => {
        setPost({
            ...post,
            caption:data
        })
    }
  
  useEffect(() => {
      setLoading(true)
      axios.get(`${HOST_URL}/posts/${props.slug}`, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
      .then(resp => {
          setPost(resp.data)
          setPost({
              id:resp.data.id,
              image:resp.data.image,
              caption:resp.data.caption,
              likes:resp.data.likes,
              liked:resp.data.liked,
              saved:resp.data.saved,
              slug:resp.data.slug,
              timestamp:resp.data.timestamp,
              comments:resp.data.comments,
              profile_pic:resp.data.user.profile_pic,              
              username:resp.data.user.username,
              owner:resp.data.owner,
          })
          setLoading(false)
      })
      .catch(error => {
          setLoading(false)
      })
  },[props.slug, props.token]);

    const likeBtnHandler = (slug) => {
        const liked = post.liked;
        var likes;
        if (post.liked){
            likes=post.likes - 1
        }
        if (!post.liked){
            likes = post.likes + 1
        }
        
        
        const url = `${HOST_URL}/posts/post/like/`
        axios.post(url, {slug:slug, liked: liked}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            setPost({
                ...post,
                liked:!(liked),
                likes:likes
            })
        })
        .catch(error=>{
        })
    }
    
    const saveBtnHandler = (slug) => {
        const saved = post.saved;
        setPost({
            ...post,
            saved:!(saved)
        })
        
        const url = `${HOST_URL}/posts/save/`
        axios.post(url, {slug:slug, saved: saved}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
        })
        .catch(error=>{
        })
    }
    
    const onlyLikeHandler = () =>{
        if (!post.liked){
           const url = `${HOST_URL}/posts/post/like/`
            axios.post(url, {slug:props.slug, liked: post.liked}, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp=>{
                if (!post.liked){
                    setPost({
                        ...post,
                        liked:true,
                        likes:post.likes+1
                    })
                }
            })
            .catch(error=>{
            })
        }
    }
    
    const cardSkeleton = (
    <Card className={classes.card}>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        title={
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
        <Skeleton animation="wave" variant="rect" className={classes.mediask} />

      <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
      </CardContent>
    </Card>        
        )

    const renderTimestamp = timestamp => {
        const date = new Date(timestamp)
        const todayDate = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
        if (todayDate.getFullYear() === date.getFullYear()){
            
            if (todayDate.getMonth()===date.getMonth()){
                if (todayDate.getDate()===date.getDate()){
                    if (todayDate.getHours()===date.getHours()){
                        if (todayDate.getMinutes()-date.getMinutes() < 2){
                            return 'Just Now'
                        }
                        else{
                            return `${todayDate.getMinutes() - date.getMinutes()} MINUTES AGO` 
                        }
                    }
                    else{
                        return `${todayDate.getHours() - date.getHours()} HOURS AGO`
                    }
                }
                else{
                    return `${todayDate.getDate() - date.getDate()} DAYS AGO`
                }
            }
            else{
                return `${date.getDate()} ${monthNames[date.getMonth()]}`
            }
            
        }
    };          

  return (
      <>
      {loading ?
      <>
      <LoadBar/>
      {cardSkeleton}
      </>
      :
    <div className={classes.root}>
      <CardHeader
      className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={post.profile_pic}/>
        }
        action={
                post.owner &&
              <IconButton aria-label="settings" onClick={handleClickOpen}>
                <MoreVertIcon />
              </IconButton>
        }
        title={
        <ButtonBase component={Link} to={`/${post.username}`}> 
            {post.username}
        </ButtonBase>
        }
      />
      <div onDoubleClick={onlyLikeHandler} className={classes.imageField}>
     {/*   <div className={`icon icon-heart ${animate ? 'like' : ''}`}>
            <Favorite className={classes.likeBtn} fontSize='large' /> 
        </div>       */}
        <img src={post.image} alt='irrifi'/>
      </div>
    
      <div  style={{padding:'8px 12px', width:'100%'}} >
        
        <IconButton className={classes.iconStyle} disableRipple onClick={()=>likeBtnHandler(post.slug)}>
            {post.liked &&
            <Favorite className={classes.likeBtn}/>
            }
            { !(post.liked) &&
            <FavoriteBorder/>
            }
        </IconButton>
       
        <IconButton className={classes.iconStyle} aria-label="comment" component={Link} to={{pathname: `/p/${post.slug}/comments`, state: { activity: true } }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton className={classes.iconStyle} aria-label="share">
          <NearMeOutlinedIcon />
        </IconButton>
        <IconButton className={classes.iconStyle} aria-label="share" style={{marginLeft:'auto', float:'right'}} onClick={()=>saveBtnHandler(post.slug)} >
            { post.saved ?
            <BookmarkOutlinedIcon className={classes.savedStyle} />
            :
            <BookmarkBorderIcon className={classes.savedStyle}/>
            }
        </IconButton>
      </div>

      <div style={{padding:'4px 16px'}}>
      
        <ButtonBase component={Link} to={{pathname: `/p/${post.slug}/likes`, state: { activity: true } }}  >
            <Typography variant='caption' component='span' style={{fontSize:'14px'}} >
                 Liked By <b> {post.likes} </b> People
            </Typography>
        </ButtonBase>
        <br/>
        
        { post.caption !== '' &&
        <Typography variant="caption" component="p" style={{ color:'#000000', fontSize:'14px'}}>
          <b>{post.username}</b> {post.caption}
        </Typography>
        }
        
        <ButtonBase component={Link} to={{pathname: `/p/${post.slug}/comments`, state: { activity: true } }} style={{color:'#808080ac', marginBottom:'1rem'}} >
            <Typography variant='subtitle2' component='span' >
                 View all {post.comments} comments
            </Typography>
        </ButtonBase>        
        <br/>
        <Typography variant='caption' component='span' style={{color:'#808080ac', fontSize:'10px', marginTop:'1rem'}}>
                {renderTimestamp(post.timestamp)}
        </Typography>
      </div>  
      <CardDialogBox open={open} onClose={handleClose} slug={props.slug} caption={post.caption} setCaption={setCaption} />      
    </div>
      }
    </>
  );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};


export default connect(mapStateToProps)(MyCard);

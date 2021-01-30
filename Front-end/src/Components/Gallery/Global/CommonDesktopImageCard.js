import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { connect } from 'react-redux';

import ProfileBar from './CardToolbar';
import BottomBar from './BottomBar';
import Comments from './Comments';
import { HOST_URL } from "../../../Settings";

const useStyles = makeStyles((theme) => ({
    content:{
        maxWidth:'100%',
        overflow:'hidden',
        margin:'auto',
        display:'flex',
        flexWrap:'nowrap',
        justifyContent:'center',
        minHeight:'400px',
        maxHeight:'600px',
    },
    imageContent:{
        display:'block',
        height:'auto',
        width:'auto',
        maxHeight:'100%',
        maxWidth:'100%',
        backgroundColor:'white',
        '@media (min-width:768px)':{
            border:'1px solid #8a8a8a73',
        }        
    },
    mainImg:{
        maxWidth:'100%',
        maxHeight:'600px',
        minHeight:'400px',
        minWidth:'415px',
        width:'auto',
        height:'auto',
        display:'block',
        objectFit:'contain',
    },
    sideContent:{
        width:'100%',
        maxWidth:'335px',
        minWidth:'335px',
        overflow:'hidden',
        position:'relative',
        backgroundColor:'white',
        '@media (max-width:767px)':{
            display:'none'
        },
        '@media (min-width:767px)':{
            border:'1px solid #8a8a8a73',
        }        
    },
}));

const CommonDesktopImageCard = (props) => {
    const classes = useStyles();
    const initialData = {
        id:'',
        image:null,
        caption:'',
        likes:'',
        liked:false,
        saved:false,
        slug:'',
        timestamp:'',
        comments:[],
        next_url:null,
        profile_pic:null,
        username:'',
        type:'',
        owner:false,
    }
    const [post, setPost] = useState(initialData);
    const [comment, setComment] = useState('');
    
    const setCaption = (data) => {
        setPost({
            ...post,
            caption:data
        })
    }
    
    useEffect(() => {
      axios.get(`${HOST_URL}/posts/d/${props.slug}`, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
      .then(resp => {
          setPost({
              id:resp.data.id,
              image:resp.data.image,
              caption:resp.data.caption,
              likes:resp.data.likes,
              liked:resp.data.liked,
              saved:resp.data.saved,
              slug:resp.data.slug,
              timestamp:resp.data.timestamp,
              comments:resp.data.comments.results,
              next_url:resp.data.comments.next_url,
              profile_pic:resp.data.user.profile_pic,              
              username:resp.data.user.username,  
              type:resp.data.userType,
              owner:resp.data.owner,
          })
      })
      .catch(error => {
      })
    },[props.slug, props.token])    
    
    const likeBtnHandler = () => {
        const liked = post.liked;
        var likes;
        if (post.liked){
            likes=post.likes - 1
        }
        if (!post.liked){
            likes = post.likes + 1
        }
        
        const url = `${HOST_URL}/posts/post/like/`
        axios.post(url, {slug:post.slug, liked: liked}, {
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
    
    const saveBtnHandler = () => {
        const saved = post.saved;
        setPost({
            ...post,
            saved:!(saved)
        })
        
        const url = `${HOST_URL}/posts/save/`
        axios.post(url, {slug:post.slug, saved: saved}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
        })
        .catch(error=>{
        })
    } 
    
    const commentChangeHandler = e => {
        setComment(e.target.value)
    };    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setComment('');
        const url = `${HOST_URL}/posts/post/comment/`
        axios.post(url, {slug:props.slug, comment:comment}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            setPost({
                ...post,
                comments:[resp.data, ...post.comments],
            })
        })
        .catch(error=>{
        })
    }    
    
    return(
        <Grid container className={classes.content}>
            <div className={classes.imageContent}>
            <img className={classes.mainImg} src={post.image} alt='fjfjj' />
            </div>
        
        <div className={classes.sideContent}>
            <ProfileBar profile_pic={post.profile_pic} username={post.username} type={post.type} token={props.token} owner={post.owner} caption={post.caption} slug={post.slug} setCaption={setCaption}/>
            <Comments comments={post.comments} caption={post.caption} username={post.username} profile_pic={post.profile_pic} slug={props.slug} next_url={post.next_url} token={props.token} />
            <BottomBar likes={post.likes} liked={post.liked} saved={post.saved} likeBtnHandler={likeBtnHandler} saveBtnHandler={saveBtnHandler} handleSubmit={handleSubmit} commentChangeHandler={commentChangeHandler} comment={comment} slug={props.slug} timestamp={post.timestamp} /> 
        </div>
        </Grid>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};


export default connect(mapStateToProps)(CommonDesktopImageCard);

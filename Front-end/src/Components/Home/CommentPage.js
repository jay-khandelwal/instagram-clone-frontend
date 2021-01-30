import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomAppbar from '../Global/CustomAppbar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import Loader from "react-loader-spinner";
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { HOST_URL, renderTimestamp } from "../../Settings";

import CommentDiv from './Global/CommentDiv';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%', 
        position:'relative', 
        zIndex:10, 
        height:'100%',
        backgroundColor:'white',
        paddingTop:'60px',
    },
    forCaption:{
        paddingTop:'1rem',
        paddingBottom:'1rem',
        borderBottom:'1px solid #6565653c',
        marginBottom:'0.8rem',
    },
    container:{
        width:'100%',
        paddingBottom:'90px',
    },
    
    appBar: {
      top: 'auto',
      bottom: 1,
      color:'black',
      position:'fixed',
      width:'100%',
      margin:'auto',
      backgroundColor:'white',
      [theme.breakpoints.up('md')]:{
           display:'none'
      }       
    },
    search: {
      position: 'relative',
      marginLeft: theme.spacing(3),
      width: '100%',
      display:'block',
    },
    searchbar:{
        margin:'0.5rem',
        border:'1px solid #6565653c',
        borderRadius:'50px',
        paddingLeft:'0px'
    },
    iconstyle:{
        marginLeft:'auto',
        color:'#3070bc'
    },
    inputInput:{
        width:'100%',
        marginTop:'auto',
        marginBottom:'auto',
        height:'100%',
    },
    formStyle:{
        display:'flex',
        width:'100%',
    },
    noContent:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      msTransform: 'translateX(-50%) translateY(-50%)',
      webkitTransform: 'translate(-50%,-50%)',
      transform: 'translate(-50%,-50%)',
      textAlign:'center',
      width:'80%',
      fontWeight:'300',
      fontSize:'16px',
      color:'gray'
    },        
}));


const CommentPage = (props) => {
    const classes = useStyles();
    const slug = props.match.params.slug
    const [comment, setComment] = useState('');
    const initialData = {
        username:'',
        profile_pic:null,
        caption:'',
        comments:[],
        next_url:null,
        count:null,
    }
    const [comments, setComments] = useState(initialData);
    const [pagee, setPagee] = useState(1);
    const [nextLoader, setNexLoader] = useState(false);
    const [noContent, setNoContent] = useState(false);
    const firstTime = useRef(true)
    const observer = useRef();
    
    useEffect(()=>{
        if (pagee > 1 && firstTime.current===false){   setNexLoader(true) 
            axios.get(comments.next_url,  {
                headers:{
                    Authorization:`Token ${props.token}`
                }
            })
            .then(resp=>{
                setComments({
                ...comments,
                comments : [...comments.comments, ...resp.data.results.comments],
                next_url:resp.data.next_url,
                count:resp.data.count,
                })
                setNexLoader(false)
            })
            .catch(error=>{
                setNexLoader(false)
            })
        }
    }, [pagee])    
    
    useEffect(()=>{
        const url = `${HOST_URL}/posts/${slug}/comments/`
        axios.get(url, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            setComments({
                username:resp.data.results.username,
                profile_pic:resp.data.results.profile_pic,
                caption:resp.data.results.caption,
                comments:[...resp.data.results.comments],
                next_url:resp.data.next_url,
                count:resp.data.count,
            })
            firstTime.current = false
            if (resp.data.results.comments.length===0){
                setNoContent(true)
            }
        })
        .catch(error=>{
        })
    }, [props.token, slug])
    
    const lastElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (firstTime.current ===true){
                    firstTime.current = false
                }
                setPagee(p=> p + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [])             
    
    const commentChangeHandler = e => {
        setComment(e.target.value)
    };    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setComment('');
        const url = `${HOST_URL}/posts/post/comment/`
        axios.post(url, {slug:slug, comment:comment}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            setComments({
                ...comments,
                comments:[resp.data, ...comments.comments],
            })
            if (noContent){
                setNoContent(false)
            }
        })
        .catch(error=>{
        })
    }
    
    const allComments = comments.comments.map((comment, index)=>{
        if (comments.comments.length === index +1){ 
            return (
                <>
               <div ref={lastElementRef}></div> 
                <CommentDiv key={comment.id} username={comment.user.username} profile_pic={comment.user.profile_pic} comment={comment.comment} liked={comment.liked} likes={comment.likes} token={props.token} id={comment.id} timestamp={renderTimestamp(comment.timestamp)} can_delete={comment.can_delete}/>
                </>
                )
        }
        else{
            return (<CommentDiv key={comment.id} username={comment.user.username} profile_pic={comment.user.profile_pic} comment={comment.comment} liked={comment.liked} likes={comment.likes} token={props.token} id={comment.id} timestamp={renderTimestamp(comment.timestamp)} can_delete={comment.can_delete}/>)          
        }
        })
        
    const commentForm = (
        <div className={classes.appBar}>
            <Toolbar className={classes.searchbar}>
                <form onSubmit={handleSubmit} className={classes.formStyle}>
                    <div className={classes.search}>
                        <InputBase
                        placeholder="comment…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={commentChangeHandler}
                        value={comment}
                        className={classes.inputInput}
                        />
                    </div>  
                    <IconButton disabled={comment !== '' ? false: true} className={classes.iconstyle} onClick={handleSubmit}>
                        <SendIcon/>
                    </IconButton>        
                </form>
            </Toolbar>
        </div>        
        )    
    
    return(
        <div className={classes.root}>
            <CustomAppbar heading='Comments' />
            <div className={classes.forCaption}>
                <CommentDiv noLike username={comments.username} profile_pic={comments.profile_pic} comment={comments.caption}/>
                <span> {renderTimestamp(comments.timestamp)} </span>
            </div>
            { !noContent ?
            <div className={classes.container}>
                {allComments}
                {nextLoader &&
                <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="BallTriangle" color="#43de6c" height={40} width={40} />
                }                            
            </div>
            :
            <Typography variant='h5' component='span' className={classes.noContent}>
                No comments
            </Typography>            
            }
            {commentForm}
        </div>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(CommentPage);
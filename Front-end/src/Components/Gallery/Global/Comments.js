import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Loader from "react-loader-spinner";
import { renderTimestamp } from "../../../Settings";
import CommentDiv from '../../Home/Global/CommentDiv';

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        height:'100%',
        paddingTop:'65px',
        overflow:'hidden'
    }, 
    root2:{
        width:'100%',
        height:'100%',
        overflowY:'auto',
        position:'relative',
        overflow:'hidden'
    },
    root3:{ 
        width:'100%', 
        position:'absolute',
        paddingBottom:'180px',
    },
    forCaption:{
        paddingTop:'1rem',
        paddingBottom:'1rem',
        borderBottom:'1px solid #6565653c',
        marginBottom:'0.8rem',
    },
    noContent:{
      position: 'absolute',
      top: '40%',
      left: '50%',
      msTransform: 'translateX(-50%) translateY(-50%)',
      webkitTransform: 'translate(-50%,-50%)',
      transform: 'translate(-50%,-50%)',
      textAlign:'center',
      width:'80%',
      fontWeight:'400',
      fontSize:'14px',
      color:'#cbcbcb'
    },        
}));  


const Comments = (props) => {
    const classes = useStyles();
    const initialData = {
        comments:[],
        next_url:null,
    }    
    const [data, setData] = useState(initialData);
   
    const [pagee, setPagee] = useState(1);
    const [nextLoader, setNexLoader] = useState(false);
    const [noContent, setNoContent] = useState(false);
    const firstTime = useRef(true)
    const observer = useRef();

    useEffect(()=>{
        if (pagee > 1 && firstTime.current===false){   setNexLoader(true) 
            axios.get(data.next_url,  {
                headers:{
                    Authorization:`Token ${props.token}`
                }
            })
            .then(resp=>{
                setData({
                comments : [...data.comments, ...resp.data.results.comments],
                next_url:resp.data.next_url,
                })
                setNexLoader(false)
            })
            .catch(error=>{
                setNexLoader(false)
            })
        }
    }, [pagee])
    
    useEffect(()=>{
        if (props.comments && props.comments.length > 0){
            setData({
                comments:props.comments,
                next_url:props.next_url,
            })
            firstTime.current = false
            if (noContent){
                setNoContent(false)
            }
        }
        else{
            setNoContent(true)
        }
    }, [props])
    
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
    
    var allComments;
    if (data.comments !== null){
    allComments = data.comments.map((comment, index)=>{
        if(data.comments.length === index + 1){ 
            return(
                <>
                <div ref={lastElementRef}></div>
                <CommentDiv key={comment.id} username={comment.user.username} profile_pic={comment.user.profile_pic} comment={comment.comment} liked={comment.liked} likes={comment.likes} token={props.token} id={comment.id} timestamp={renderTimestamp(comment.timestamp)} can_delete={comment.can_delete} />
                </>
            )
        }
        else{
            return(
                <CommentDiv key={comment.id} username={comment.user.username} profile_pic={comment.user.profile_pic} comment={comment.comment} liked={comment.liked} likes={comment.likes} token={props.token} id={comment.id} timestamp={renderTimestamp(comment.timestamp)} can_delete={comment.can_delete} />
            )            
        }
        })
    }
        
    return(
        <div className={classes.root}>
        <div className={classes.root2}>
            <div className={classes.forCaption}>
            <CommentDiv noLike profile_pic={props.profile_pic} username={props.username} comment={props.caption}/>
            </div>
        { !noContent ?
        <div className={classes.root3}>
            {allComments}
            {nextLoader &&
            <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="BallTriangle" color="#43de6c" height={40} width={40} />
            }            
        </div>
        :
        <Typography variant='h5' component='span' className={classes.noContent}>
            no comments
        </Typography>
        }
        </div>
        </div>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(Comments);

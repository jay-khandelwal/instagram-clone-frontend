import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from "react-router-dom";
import { HOST_URL } from "../../../Settings";

const useStyles = makeStyles((theme) => ({
    commentRoot:{
        display:'flex',
        alignContent:'center',
        width:'100%',
    },  
    avatar:{
        padding:'0.6rem',
    },
    avtContent:{
        width:theme.spacing(4),
        height:theme.spacing(4),
    },
    content:{
        width:'100%',
        paddingLeft:'0.3rem',
        paddingRight:'0.3rem',
        paddingTop:'0.5rem',
    },
    iconStyle:{
        margin:'auto',
    },
    commentSpan:{
        fontSize:'10px',
        color:'#717171ac',
        paddingLeft:'5px',
        paddingRight:'5px',
        textTransform: 'lowercase',
    },
    likeBtn:{
       color:'#ff007e'
    },
    noDisplay:{
        display:'none',
    },
}));


const CommentDiv = (props) => {
    const classes = useStyles();
    const [liked, setLiked] = useState(props.liked)
    const [likes, setLikes] = useState(props.likes)
    const [display, setDisplay] = useState(true)
    
    const likeBtnHandler = () => {
        const url = `${HOST_URL}/posts/comment/like/`

        axios.post(url, {id:props.id, liked: liked}, {
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
    
    const deleteBtnHandler = () => {
        const url = `${HOST_URL}/posts/comment/delete/`
        axios.post(url, {id:props.id}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            setDisplay(false);
        })
        .catch(error=>{
        })
    }
    
    return(
        <div className={`${classes.commentRoot} ${display ? '': classes.noDisplay}`}>
            <div className={classes.avatar}>
                <Avatar className={classes.avtContent} aria-label="recipe" src={props.profile_pic || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGCQcjy5QEnlOWwFPrhV67gtHvqsRcUUwDeg&usqp=CAU"}/>
            </div>            
       
            <div className={classes.content}>
                <div>
                    <Typography variant='caption'>                
                    <ButtonBase component={Link} to={`/${props.username}`}><b style={{marginRight:'0.2rem'}}>{props.username}</b></ButtonBase>
                   
                        {props.comment}
                    </Typography>
                    <Typography>
                    <span className={classes.commentSpan}>{props.timestamp} </span>
                    { !props.noLike &&
                    <span className={classes.commentSpan}>
                        {likes} likes
                    </span>
                    }
                    { props.can_delete &&
                    <ButtonBase onClick={deleteBtnHandler} className={classes.commentSpan}>
                        delete
                    </ButtonBase>
                    }
                    </Typography>
                </div>
            </div>
            
            { !props.noLike ?
            <div>
                <IconButton className={classes.iconStyle} disableRipple onClick={()=>likeBtnHandler(props.key)}>
                    {liked &&
                    <Favorite className={classes.likeBtn}/>
                    }
                    { !(liked) &&
                    <FavoriteBorder/>
                    }
                </IconButton>            
           {/*     <IconButton className={classes.iconStyle}>
                <FavoriteBorderIcon />
                </IconButton>*/}
            </div>
            :
            null
            }
        </div>        
        );
        
}

export default CommentDiv;
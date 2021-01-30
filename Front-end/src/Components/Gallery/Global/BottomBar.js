import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root:{
        position:'absolute',
        bottom:0,
        width:'100%',
        minHeight:'2rem',
        height:'auto',
        borderTop:'1px solid #8a8a8a73',
        backgroundColor:'white',
        margin:'3rem auto auto auto',
        '@media (max-width:768px)':{
           display:'none'
        }               
    },
    commentDiv:{
        display:'flex',
        width:'100%',
        padding:'0.8rem 0.4rem',
        borderTop:'1px solid #8a8a8a73',
    },
    comment: {
      position: 'relative',
      marginLeft: theme.spacing(3),
      width: '100%',
      display:'block',
    },
    inputInput:{
        width:'100%',
        height:'100%',
        padding:'auto 0.3rem',
    },
    savedStyle:{
      color:'black'
  },
    likeBtn:{
      color:'#ff007e'
  },
  iconStyle:{
      padding:'4px 0.8rem 4px 2px',
  },  
}));

const BottomBar = (props) => {
    const classes = useStyles();
    
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
    
    return(
        <div component={Paper} className={classes.root} >
        <div className={classes.container}>
            <div style={{padding:'0px'}}>
                <IconButton disableRipple onClick={()=>props.likeBtnHandler()}>
                    {props.liked &&
                    <Favorite className={classes.likeBtn}/>
                    }
                    { !(props.liked) &&
                    <FavoriteBorder/>
                    }
                </IconButton>
                <IconButton aria-label="share" style={{marginLeft:'auto', float:'right'}} onClick={()=>props.saveBtnHandler()} >
                    { props.saved ?
                    <BookmarkOutlinedIcon className={classes.savedStyle}/>
                    :
                    <BookmarkBorderIcon className={classes.savedStyle} />
                    }
                </IconButton>                
            </div>  
                
          <div style={{padding:'4px 16px'}}>
          
            <ButtonBase component={Link} to={{pathname: `/p/${props.slug}/likes`, state: { activity: true } }}  >
                <Typography variant='caption' component='span' style={{fontSize:'14px'}} >
                     Liked By <b> {props.likes} </b> People
                </Typography>
            </ButtonBase>

            <br/>
            <Typography variant='caption' component='span' style={{color:'#808080ac', fontSize:'10px', marginTop:'1rem'}}>
                        {renderTimestamp(props.timestamp)}
            </Typography>
          </div>                        
            
            <form onSubmit={props.handleSubmit} className={classes.commentDiv}>
                   <div className={classes.comment}>
                    <InputBase
                      placeholder="Add a comment…"
                      className={classes.inputInput}
                      inputProps={{ 'aria-label': 'search' }}
                      value={props.comment}
                      onChange={props.commentChangeHandler}
                    />
                  </div>  
                  <Button default style={{color:'#3088d3'}} onClick={props.handleSubmit}>
                      post
                  </Button>
            </form>           
            
        </div>
        </div>
        );
}

export default BottomBar;
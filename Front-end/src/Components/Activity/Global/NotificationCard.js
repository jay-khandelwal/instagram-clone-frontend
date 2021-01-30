import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';

import { HOST_URL } from "../../../Settings";
//import UserBadge from './UserBadge';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        padding:'0.5rem',
        flexWrap:'nowrap',
        display:'flex',
        textAlign:'left',        
    },
    gridOne:{
        marginLeft:'0.4rem',
        marginRight:'0.8rem',
        marginTop:'0.2rem',
      //  margin:'auto 0.8rem auto 0.4rem'
    },
    gridTwo:{
        width:'100%',
        fontSize:'14px',
    },
    gridThree:{
        width:'100%',
        fontSize:'10px',
        textAlign:'left',
     //   paddingLeft:'10px',
        color:'gray',
    },
    btnstyle:{
    },
    unreadStyle:{
        color:'white',
        backgroundColor:'black',
    }
}));


const NotificationCard = (props) => {
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
                   // return `${date.getHours()} HOURS AGO`
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
    
    var redirect_to;
    if ((props.type === 'PostLike') || (props.type === 'PostComment') || (props.type=== 'CommentLike')){
        redirect_to = {pathname: `/p/${props.other.slug}`, state: { isImagePopup: true }}
    }
    else if (props.type === 'RequestAccepted' || props.type === 'RequestReceived' ) {
        redirect_to = `/${props.from}`
    }
    else {
        alert('redirect to home page')
        redirect_to='/'
    }
    
    return(
        <ButtonBase component={Link} to={redirect_to} focusRipple className={classes.btnstyle} color="primary">
        
            <div className={`${classes.root} ${props.read ? '' : classes.unreadStyle}`}>
                <div className={classes.gridOne}>
                    <Avatar aria-label="recipe" className={classes.avatar} src={ HOST_URL+props.profile_pic || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGCQcjy5QEnlOWwFPrhV67gtHvqsRcUUwDeg&usqp=CAU"}/>
                </div>
                
                <div style={{width:'100%', display:'flex', flexWrap:'wrap', flexDirection:'column', justifyContent:'center'}}>
                <div className={classes.gridTwo}>
                    <Typography variant="caption" component='p'>
                   
                        { props.type === 'RequestReceived' &&
                        <>
                      <ButtonBase component={Link} to={`/${props.from}`}>
                      <b> @{props.from} </b> 
                      </ButtonBase>
                      sends you a following request.
                      </>
                        }
                  
                        { props.type === 'PostLike' &&
                        <>
                      <b> @{props.from} </b> likes you post.</>
                        }
                   
                        { props.type === 'PostComment' &&
                        <>
                      <b> @{props.from} </b> comment on your post.</>
                        }
                   
                        { props.type === 'RequestAccepted' &&
                        <>
                      <b> @{props.from} </b> accepted you friend request.</>
                        }
                 
                        { props.type === 'CommentLike' &&
                        <>
                      <b> @{props.from} </b> likes the comment of your post  {props.other.comment}.</>
                        }

                   </Typography> 
                </div>
                
                <div className={classes.gridThree}>
                    <Typography component='span' variant='caption' >
                       {renderTimestamp(props.timestamp)}
                    </Typography>
                </div>
                </div>
                { ((props.type === 'PostLike') || (props.type === 'PostComment') || (props.type=== 'CommentLike')) &&
                <div className={classes.content_img}>
                    <img alt='sething' src={props.other.post} style={{width:'50px', height:'50px'}}/>
                </div>         
                }
            </div>
            
        </ButtonBase>
    /*    <ButtonBase focusRipple className={classes.btnstyle} color="primary">
        
            <div className={classes.root}>
                <div className={classes.gridOne}>
                    <Avatar aria-label="recipe" className={classes.avatar} src={ HOST_URL+props.profile_pic || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGCQcjy5QEnlOWwFPrhV67gtHvqsRcUUwDeg&usqp=CAU"}/>
                </div>
                
                <div style={{display:'flex', flexWrap:'wrap', flexDirection:'column'}}>
                <div className={classes.gridTwo}>
                    <Typography variant="overview" component='p'>
                        { props.type == 'RequestReceived' &&
                        `${props.from} sends you a following request.`
                        }

                   </Typography> 
                </div>
                
                <div className={classes.gridThree}>
                    <Typography component='span' variant='caption' >
                        {renderTimestamp(props.timestamp)}
                    </Typography>
                </div>
                </div>
            </div>
            
        </ButtonBase>*/
        );
}

export default NotificationCard;
    

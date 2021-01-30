import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';

import { HOST_URL } from "../../Settings";
import FollowPopup from './FollowPopup';

const useStyles = makeStyles((theme) => ({
    root:{
        padding:'0.5rem',
        flexWrap:'nowrap',
    },
    gridone:{
        margin:'auto',
    },
    gridtwo:{
        width:'100%',
        margin:'auto 0.4rem auto 1rem',
    },
    btnstyle:{
        width:'100%',
        textAlign:'left',
    },
    button:{
        margin:'auto',
    }
}));


const UserItem = (props) => {
    const classes = useStyles();
    const [type, setType] = useState(props.type);
    
    const [open, setOpen] = useState(false);
    const handleClickOpen = (e) => {
      e.stopPropagation();
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    }; 

    const sendRequestHandler = () => {
        const url = `${HOST_URL}/frequest/send/`
        axios.post(url, {receiver:props.first} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        } )
        .then(resp => {
            console.info(resp.data)
            setType('requested')
        })  
        .catch(error=> {
            console.log(error)
        })
    }        
    
    const cancelRequestHandler = () => {
        const url = `${HOST_URL}/frequest/cancel/`
        axios.post(url, {receiver:props.first} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        } )
        .then(resp => {
            console.info(resp.data)
            setType('follow')
        })  
        .catch(error=> {
            console.log(error)
        })
    }   
    
    
    const unfollowHandler = () => {
        const url = `${HOST_URL}/profile/unfollow/`
        axios.post(url, {anotherUser:props.first} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        } )
        .then(resp => {
            console.info(resp.data)
            setType('follow')
            handleClose()
        })  
        .catch(error=> {
            console.log(error)
        })
    }

    
    
    return(
          /*  <ButtonBase component={Link} to={`/${props.first}`} style={{width:'100%'}}>
            <ButtonBase style={{width:'100%'}}>*/
            <Grid 
            container 
            justify='center' 
            alignContent='center'
            className={classes.root}
            >
                <Grid item className={classes.gridone}>
                    <Avatar component={Link} to={`/${props.first}`} aria-label="recipe" className={classes.avatar} src={props.profile_pic}/>
                </Grid>
                <Grid item className={classes.gridtwo} >
                
                   <ButtonBase component={Link} to={`/${props.first}`}>
                        {props.first}
                   </ButtonBase>
                   <br/>
                    <Typography variant="caption" color="textSecondary">
                        {props.second}
                   </Typography>
                   
                </Grid>
                <Grid item xs />
                {props.children}
                
                { type==='follow' || type==='follower' ?
               <div className={classes.button}>
                    <Button size='small' style={{color:'white', backgroundColor:'#009cfde8'}} onClick={sendRequestHandler} >
                        Follow
                    </Button>                
                </div>       
                :
                null
                }
                
                { type==='following' ?
               <div className={classes.button}>
                    <Button size='small' style={{color:'#009cfde8', border:'1px solid #009cfde8'}} onClick={handleClickOpen}>
                        Following
                    </Button>                
                </div>       
                :
                null
                }
                
                { type==='requested' ?
               <div className={classes.button}>
                    <Button size='small' style={{color:'tomato', border:'1px solid tomato'}} onClick={cancelRequestHandler} >
                        Cancel
                    </Button>                
                </div>       
                :
                null
                }
                
                <FollowPopup open={open} close={handleClose} username={props.first} profile_pic={props.profile_pic} unfollowHandler={unfollowHandler}/>
                
            </Grid>   

        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(UserItem);



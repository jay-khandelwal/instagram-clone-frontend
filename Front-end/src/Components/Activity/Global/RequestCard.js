import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Avatar from '@material-ui/core/Avatar';

import { HOST_URL } from "../../../Settings";

const useStyles = makeStyles((theme) => ({
    root:{
        display:'inline-block',
        marginBottom:'0.6rem',
        width:'100%',
    //    backgroundColor:'red'
    },
    avatarstyle:{
        float:'left',
        marginTop:'0.8rem',
        marginLeft:'0.4rem',
        margin:'auto'
    },
    details:{
        width:'70%',
        float:'left',
        marginLeft:'1rem',
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
   btnstyle:{
      width:'100%',
      marginTop:'0.4rem',
      '& button':{
          width:'50%'
      }
  },
  btnone:{
      color:'green',
      borderColor:'green'
  },
  btntwo:{
      color:'red',
      borderColor:'red'
  },
  noDisplay:{
      display:'none'
  }
}));


const RequestCard = (props) => {
  const classes = useStyles();
  const [noDisplay, setNodisplay] = useState();
    const acceptRequestHandler = () => {
        const url = `${HOST_URL}/frequest/accept/`
        axios.post(url, {request_sender:props.username} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            setNodisplay(true)
        })
        .catch(error => {
        })              
    }
  
    const declineRequestHandler = (e) => {
        const url = `${HOST_URL}/frequest/decline/`
        axios.post(url, {sender:props.username} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        } )
        .then(resp => {
            setNodisplay(true)
        })  
        .catch(error=> {
        })
    }     
  
  const Buttons = (
       <ButtonGroup aria-label="outlined secondary button group" className={classes.btnstyle}>
        <Button fullWidth={true} className={classes.btnone} onClick={acceptRequestHandler}>Accept</Button>
        <Button fullWidth={true} className={classes.btntwo} onClick={declineRequestHandler}>Decline</Button>
      </ButtonGroup>           
      )

  return (
      <>
    <div className={`${classes.root} ${noDisplay && classes.noDisplay}`}>
  
    <div className={classes.avatarstyle} >
      <Avatar alt={props.full_name} src={props.image} className={classes.large} />
    </div>  
    
      <div className={classes.details}>

          <Typography component="h6" variant="h5">
            {props.username}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.full_name} wants to follow you.
          </Typography>
       
        
            {Buttons}
        
      </div>
    
    </div>
    </>
  );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(RequestCard);


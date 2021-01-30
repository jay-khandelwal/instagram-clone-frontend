import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { HOST_URL } from "../../Settings";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme)=>({
    content:{
        backgroundColor:'#ffffff',
        '& h4':{
           margin:'1.5rem 1rem'
        },
        '& hr':{
            margin:'0px',
            padding:'0px',
            backgroundColor:'#80808060'
        },
        '& button':{
        },
    },
    btn1:{
        color:'#4c88c2'
    },
    btn2:{
        color:'#e45035'
    },
}))



const DeleteAllChatPopup = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    
    const closeDeleteDialog = () => {
        props.onClose();
        setOpen(false);
    }
  
    
    const deletePostHandler = () => {
        const url = `${HOST_URL}/chat/edit/${props.roomid}/`;
        axios.delete(url, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            closeDeleteDialog();
            history.push('/direct/inbox')
        })
        .catch(error=>{
            closeDeleteDialog();
        })
    };
    
    
    return(
        <div>
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >           

        <div className={classes.content}>
            <Typography variant='h5' component='h4' justify='center' >
                Chat Settings
            </Typography>
            <div>
                
                <hr/>
                <Button 
                fullWidth={true} 
                className={classes.btn2} 
                onClick={()=>setOpen(true)}
                >
                    Delete all messages
                </Button>
                
                <hr/>
                <Button 
                fullWidth={true}
                onClick={props.onClose} 
                >
                    Cancel
                </Button>
                
            </div>
        </div>
        </Dialog>
        
        {open &&
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >           

        <div className={classes.content}>
            <Typography variant='h5' component='h4' justify='center' >
                Do you really want to delete all messages ?
            </Typography>
            <div>
                
                <hr/>
                <Button 
                fullWidth={true} 
                className={classes.btn2} 
                onClick={closeDeleteDialog}
                >
                    No
                </Button>
                
                <hr/>
                <Button 
                fullWidth={true} 
                className={classes.btn2} 
                onClick={deletePostHandler}
                >
                    Yes
                </Button>
                
            </div>
        </div>
        </Dialog>
        }
        
        </div>            
        );
}


const mapStateToProps = state => {
    return{
        username:state.auth.username,
        token:state.auth.token
    };
};


export default connect(mapStateToProps)(DeleteAllChatPopup);


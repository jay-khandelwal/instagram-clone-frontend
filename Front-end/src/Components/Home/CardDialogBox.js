import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
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



const CardDialogBox = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    
    const closeDeleteDialog = () => {
        props.onClose();
        setOpen(false);
    }
    
    const closeEditDialog = () => {
        props.onClose();
        setEdit(false);
    }
    
    const deletePostHandler = () => {
        const url = `${HOST_URL}/posts/delete/${props.slug}/`;
        axios.delete(url, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            closeDeleteDialog();
            if (props.deleteFunc){
                props.deleteFunc(true);
            }
            else{
               history.goBack() 
            }
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
                Advance Options
            </Typography>
            <div>
                
                <hr/>
                <Button 
                fullWidth={true} 
                className={classes.btn2} 
                onClick={()=>setEdit(true)}
                >
                    Edit
                </Button>
                
                <hr/>
                <Button 
                fullWidth={true} 
                className={classes.btn2} 
                onClick={()=>setOpen(true)}
                >
                    Delete
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
                Do you really want to delete this post ?
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
        
        <EditCaption edit={edit} closeEditDialog={closeEditDialog} slug={props.slug} token={props.token} caption={props.caption} setCaption={props.setCaption}/>
        </div>            
        );
}

const EditCaption = (props) => {
    const captionHandler = (e) => {
        props.setCaption(e.target.value);
    }
    
    const editPostHandler = () => {
        const url = `${HOST_URL}/posts/update/`;
        axios.patch(url, {'caption':props.caption, 'slug':props.slug}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            props.closeEditDialog();
        })
        .catch(error=>{
            props.closeEditDialog();
        })
    };
    
    return(
        <Dialog
        open={props.edit}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.closeEditDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >           

        <div style={{padding:'1rem'}} >
            <Typography variant='h5' component='h4' justify='center' >
                Update your caption
            </Typography>
            <div style={{paddingTop:'1.2rem'}}>
                
                <TextField
                autoFocus
                margin="dense"
                type="caption"
                value={props.caption}
                onChange={captionHandler}
                fullWidth
                />
                
            </div>
            <DialogActions>
              <Button onClick={props.closeEditDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={editPostHandler} color="primary">
                Update
              </Button>
            </DialogActions>            
        </div>
        </Dialog>        
        );
}


const mapStateToProps = state => {
    return{
        username:state.auth.username,
        token:state.auth.token
    };
};


export default connect(mapStateToProps)(CardDialogBox);


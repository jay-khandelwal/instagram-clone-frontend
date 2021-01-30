import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Loader from "react-loader-spinner";

import * as profileActions from '../../../Store/Actions/Profile';
import AlertBar from './Alert';
import { HOST_URL } from "../../../Settings";


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
    input: {
        display: 'none',
    },
}))



const ProfilePicDialogBox = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState();
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertData, setAlertData] = useState({});
    
    const alertHandleClick = (type, message) => {
    setAlertOpen(true);
    setAlertData({
        type:type,
        message:message
    })
    };
    
    const alertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
    };
    
    
    const handleImageChange = (e) => {
        setLoading(true)
        
        const image = e.target.files[0]
        let form_data = new FormData();
        
        form_data.append('profile_pic', image, image.name);
        form_data.append('username', props.username);
        
        let url = `${HOST_URL}/accounts/profile/edit/`
        
        axios.put(url, form_data, {
            headers:{
                'Authorization': `Token ${props.token}`
            }})
            .then(resp => {
              props.onClose();
              setLoading(false)
              props.changeProfilePic(resp.data.profile_pic)
              alertHandleClick('success', 'Profile Picture Updated Successfully.');
            })
            .catch(err => {
                props.onClose();
                setLoading(false)
                alertHandleClick('error', 'An Error Occur.')
            })
    };
    
    const handleRemoveProfilePic = () => {
        if (props.profile_pic){
            props.onClose();
            props.changeProfilePic(null)
            props.removeProfilePic(props.username, alertHandleClick, props.token )
            alertHandleClick('success', 'Profile Picture Removed Successfully.');
        }
        else{
            props.onClose();
            alertHandleClick('error', 'No Profile Picture to Remove.');
        }
        
    }
    

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
                Change Profile Photo
            </Typography>
            <div>
            
                <hr/>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    name='image'
                    className={classes.input}
                    id="contained-button-file"
                    onChange={handleImageChange}
                />  
                <label htmlFor="contained-button-file">
                    <Button
                    fullWidth={true} 
                    className={classes.btn1} 
                    component="span"
                    >
                    {loading ?
                    <Loader 
                    type='TailSpin' 
                    color='#4c88c2' 
                    height={25} 
                    width={25} 
                    style={{display:'flex', justifyContent:'center', width:'100%'}}
                    />                     
                    :
                        'Upload Photo'
                    }
                    </Button>
                </label>
                
                <hr/>
                <Button 
                fullWidth={true} 
                className={classes.btn2} 
                onClick={handleRemoveProfilePic}
                >
                    {props.loading ?
                    <Loader 
                    type='TailSpin' 
                    color='#e45035' 
                    height={25} 
                    width={25} 
                    style={{display:'flex', justifyContent:'center', width:'100%'}}
                    />                     
                    :
                        'Remove Current Photo'
                    }                
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
        
        <AlertBar
        message={alertData.message}
        handleClose={alertHandleClose}
        open={alertOpen}
        type={alertData.type}
        />
        
        </div>            
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token,
        loading:state.profile.loading
    };
};

const mapDispatchToProps = dispatch => {
    return{
        removeProfilePic: (username, alertFunc, token) =>
            dispatch(profileActions.removeProfilePic(username, alertFunc,token)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicDialogBox);


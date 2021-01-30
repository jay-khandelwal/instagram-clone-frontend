import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { connect } from 'react-redux';

import { HOST_URL } from "../../../Settings";

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
    },
    privacy:{
        width:'100%',
    },
    content:{
        width:'100%',
        display:'flex',
        position:'relative'
    },
    text:{
        width:'85%',
        padding:'0.5rem',
        fontWeight:600,
    },
    switchStyle:{
    },
    heading:{
        '@media (max-width:768px)':{
            display:'none'
        }
    }
}));

const PrivacyPage = (props) => {
    const classes=useStyles();
    const [checked, setChecked] = useState(false);
    
    useEffect(()=>{
        const url=`${HOST_URL}/accounts/get-set-privacy/`
        axios.get(url, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            setChecked(resp.data.privacy)
        })
        .catch(error=>{
        })
    }, [props.token])
    
    const handleChange = () => {
        const url=`${HOST_URL}/accounts/get-set-privacy/`
        axios.put(url, {privacy:!checked} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            console.log(resp.data)
            setChecked(!checked)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return(
        <div className={classes.root}>
           <Typography Component='h4' variant='h5' style={{padding:'0.5rem'}} className={classes.heading}>
               Accounts Privacy
           </Typography>
           <div className={classes.privacy}>
                <div className={classes.content}>
  
                    <Typography 
                    className={classes.text}
                    >
                        Turn Your Privacy Off.
                    </Typography>
                
                    <Switch
                    checked={checked}
                    onChange={handleChange}
                    className={classes.switchStyle}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                
                </div>
                <div style={{padding:'0.5rem'}}>
                    <Typography variant='caption' Component='p' style={{color:'#79797990'}}>
                        When your account is private only your followers are able to see your images.
                    </Typography>
                </div>
           </div>
        </div>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(PrivacyPage);


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
        marginLeft:'1.1rem',
        margin:'auto',
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
    const url= `/${props.first}`
    
    const cancelRequestHandler = (e) => {

        const url = `${HOST_URL}/frequest/cancel/`
        axios.post(url, {receiver:props.first} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        } )
        .then(resp => {
        })  
        .catch(error=> {
        })
    }   
    
    const handleChangeFollowing = (e) => {
        e.stopPropagation();        
        setType('follow')
    }
    
    
    return(
        <ButtonBase focusRipple className={classes.btnstyle} color="primary" component={Link} to={url}>
            
            <Grid 
            container 
            justify='center' 
            alignContent='center'
            className={classes.root}
            
            >
                <Grid item className={classes.gridone}>
                    <Avatar aria-label="recipe" className={classes.avatar} src={props.profile_pic}/>
                </Grid>
                <Grid item xs className={classes.gridtwo} >
                
                   <Typography variant="subtitle1">
                        {props.first}
                   </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {props.second}
                   </Typography>
                   
                </Grid>

                {props.children}
                
                { type==='follow' ?
               <div className={classes.button}>
                    <Button size='small' style={{color:'white', backgroundColor:'#009cfde8'}} >
                        Follow
                    </Button>                
                </div>       
                :
                null
                }
                
                { type==='following' ?
               <div className={classes.button}>
                    <Button size='small' style={{color:'#009cfde8', border:'1px solid #009cfde8'}} onClick={handleChangeFollowing}>
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
                
            </Grid>   
            
        </ButtonBase>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(UserItem);



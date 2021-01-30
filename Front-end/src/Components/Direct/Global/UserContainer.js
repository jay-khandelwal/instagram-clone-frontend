import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { NavLink } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root:{
        padding:'0.5rem',
        flexWrap:'nowrap',
    },
    gridone:{
        margin:'auto',
        padding:'0.6rem',
    },
    gridtwo:{
        width:'100%',
        paddingLeft:'0.3rem',
        margin:'auto',
    },    
    btnstyle:{
        width:'100%',
        textAlign:'left',
    },
}));

const UserContainer = (props) => {
    const classes = useStyles();
    return(
        <ButtonBase component={NavLink} to={`/direct/chat/${props.id}`} focusRipple className={classes.btnstyle} color="primary">

            <Grid 
            container 
            justify='center' 
            alignContent='center'
            className={classes.root}
            >
                <Grid item  className={classes.gridone}>
                    <Avatar aria-label="recipe" className={classes.avatar} src={props.profile_pic}/>
                </Grid>
                <Grid item className={classes.gridtwo}>
                
                   <Typography variant="subtitle1" style={{margin:'auto'}}>
                    {props.username}
                   </Typography>
                    <Typography variant="caption" color="textSecondary">
                        { props.read ?
                        <>{props.lastmssg} • {props.timestamp}</>
                        :
                        <b>{props.lastmssg} • {props.timestamp}</b>
                        }
                   </Typography>
                   
                </Grid>
                <Grid item xs />
                { props.unread_mssg_count > 0 &&
               <span className="circle">{props.unread_mssg_count}</span>
                }
                {props.children}
            </Grid>

        </ButtonBase>
        );
}

export default UserContainer;


    

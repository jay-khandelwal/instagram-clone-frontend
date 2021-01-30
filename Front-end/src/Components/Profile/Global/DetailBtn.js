import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    btnContainer:{
        borderTop:'1px solid #6565653c',
        borderBottom:'1px solid #6565653c',
    },    
    detailbtn:{
        width:'33.33%',
        padding:'0.4rem 0.7rem',
        '& span':{
            display:'block',
            textAlign:'center',
            
        },
    },
}));


const DetailBtn = (props) => {
    const classes = useStyles();
    
    return(
        <div className={classes.btnContainer}>
            <Button className={classes.detailbtn} disabled={props.disable}>
               <span> {props.posts}</span>
               <span style={{color:'#484e4f8c'}}>Posts </span>
            </Button>                   
            <Button className={classes.detailbtn} component={Link} to={`/${props.username}/followers`} disabled={props.disable}>
               <span> {props.followers}</span>
               <span style={{color:'#484e4f8c'}}>Followers </span>
            </Button>                   
            <Button className={classes.detailbtn} component={Link} to={`/${props.username}/followings`} disabled={props.disable}>
               <span> {props.followings}</span>
               <span style={{color:'#484e4f8c'}}>Followings </span>
            </Button>                   
           
        </div>
        );
}


export default DetailBtn;

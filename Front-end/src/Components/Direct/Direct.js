import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import MessagedUsers from './Global/MessagedUsers';


const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%', 
        height:'100%', 
        padding:'20px',
        boxSizing:'border-box',
    },
    root2:{
        width:'100%', 
        height:'100%', 
        maxWidth:'935px', 
        backgroundColor:'white', 
        display:'flex', 
        flexDirection:'row', 
        alignContent:'stretch', 
        alignItems:'stretch', 
        margin:'auto',
        border:'1px solid #6565653c'
    },
    gridone:{
        width:'30%', 
        position:'relative', 
        overflowX:'hidden',
        overflowY:'auto',
        borderRight:'1px solid #6565653c'
    },
    gridtwo:{
        width:'70%', 
        height:'100%',
        position:'relative',
        display:'flex', 
        flexDirection:'column', 
        alignContent:'stretch', 
        alignItems:'stretch', 
    },
}));
    
const Direct = (props) => {
    const classes = useStyles();
        
    return(
            <div className={classes.root}>
                <div className={classes.root2}>
                    <div className={classes.gridone}>
                        <MessagedUsers/>
                    </div>
                    <div className={classes.gridtwo}>
                        {props.children}
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

export default React.memo(connect(mapStateToProps)(Direct));

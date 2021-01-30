import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

import ChatDialogBox from './ChatDialogBox';

const useStyles = makeStyles((theme) => ({
    // for messages page
    chat_content:{
        width:'100%',
    },
    messageRoot:{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        height:'100%',
        overflow:'hidden',
    },  
    content:{
        display:'flex',
        flexDirection:'column-reverse',
        width:'100%',
        height:'100%',
        paddingBottom:'140px',
        overflowY:'auto',
        '@media (max-width:768px)':{
            paddingBottom:'70px',
        }
    },
    chatpage:{
       display:'flex',
       flexDirection:'column-reverse',
       padding:'0.4rem',
       height:'100%',
       overflowY:'auto',
    },
    mssg:{
        margin:'0.5rem',
        padding:'0.4rem',
        paddingBottom:'0px',
        borderRadius:'10px',
    },
    sendmssg:{
        textAlign:'left',
        float:'right',
        marginLeft:'30%',
        color:'white',
        backgroundImage: 'linear-gradient(to right bottom, #b993d6, #ac99da, #a09edc, #95a2dc, #8ca6db)',
    },
    recvmssg:{
        textAlign:'left',
        float:'left',
        marginRight:'30%',
        color:'white',
        backgroundImage: 'linear-gradient(to right, #4ca1af, #6db1bc, #8bc0ca, #a8d0d7, #c4e0e5)',
    },
    chatinfo:{
        display:'inline-block',
        float:'right',
        position:'relative',
        '& span':{
        },
        '& svg':{
            color:'white',
            fontSize:'12px',
            position:'relative',
            top:2,
            marginLeft:'4px',
        }
    } ,
    timeStyle:{
        fontSize:'8px'
    },
    noDisplay:{
        display:'none',
    }
}));

const ChatMessage = (props) => {
    const classes = useStyles();
    const [display, setDisplay] = useState(true);
    const [open, setOpen] = useState(false);
 
    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    }; 

    
    return(
            <>
          {/*  { props.sameday &&
            <div style={{width:'100%', padding:'0.4rem', textAlign:'center'}}>
                <Typography variant='caption'>
               <b> {props.timestamp} </b>
                </Typography>
            </div> 
            }*/}
            <div onDoubleClick={
                handleClickOpen } className={`${classes.chat_content} ${display ? '': classes.noDisplay}`}   >
           { props.username===props.sender ?
                <div className={`${classes.mssg} ${classes.sendmssg}`}>
                    <Typography variant='subtitle2' component='p'>
                        {props.content}
                    </Typography>
                    <div className={classes.chatinfo}>
                        <Typography variant='caption' component='span' className={classes.timeStyle}>
                            {props.timestamp}
                        </Typography>
                        <DoneIcon />
                    </div>
                </div>
            :
                <div className={`${classes.mssg} ${classes.recvmssg}`}>      
                    <Typography variant='subtitle2' component='p'>
                        {props.content}
                    </Typography>
                               
                    <Typography variant='caption' component='span' className={classes.timeStyle}>
                        {props.timestamp}
                    </Typography>
                </div>}
            </div>  
            <ChatDialogBox open={open} onClose={handleClose} id={props.id} setDisplay={setDisplay} token={props.token}/>
           </>        
        );
}

export default ChatMessage;
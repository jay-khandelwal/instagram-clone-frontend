import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    // for width less than 768px 
    appBar: {
      top: 'auto',
      bottom: 1,
      color:'black',
      position:'fixed',
      width:'100%',
      margin:'auto',
      backgroundColor:'white',
      [theme.breakpoints.up('md')]:{
           display:'none'
      }       
    },
    search: {
      position: 'relative',
      marginLeft: theme.spacing(3),
      width: '100%',
      display:'block',
   //   backgroundColor:'lime',
    },
    searchbar:{
        margin:'0.5rem',
        border:'1px solid #8080808d',
        borderRadius:'50px',
        paddingLeft:'0px'
    },
    iconstyle:{
        marginLeft:'auto',
        color:'#3070bc'
    },
    // over for width less than 768px
    
    // for width more than 768px 
    root:{
        position:'absolute',
        bottom:0,
        width:'100%',
        minHeight:'2rem',
        height:'auto',
        padding:'0.8rem 1rem',
        margin:'3rem auto auto auto',
        boxSizing:'border-box',
     //   backgroundColor:'red',
        '@media (max-width:768px)':{
           display:'none'
        }               
    },
    content:{
        display:'flex',
        width:'100%',
        border:'1px solid #8080808d',
        borderRadius:'50px'
    },
    inputInput:{
        width:'100%',
        marginTop:'auto',
        marginBottom:'auto',
        height:'100%',
    },
    formStyle:{
        display:'flex',
        width:'100%',
    }
}));

const MessagesInput = (props) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const messageChangeHandler = e => {
        setMessage(e.target.value)
    };
    
    const handleSubmit = e => {
        e.preventDefault();
        props.forsubmit(message)
        setMessage('')
    }
   
    const CommonInput = (
        <form onSubmit={handleSubmit} className={classes.formStyle}>
            <div className={classes.search}>
                <InputBase
                placeholder="message…"
                multiline={false}
                inputProps={{ 'aria-label': 'search' }}
                onChange={messageChangeHandler}
                value={message}
                className={classes.inputInput}
                />
            </div>  
            <IconButton disabled={message !== '' ? false: true} className={classes.iconstyle} onClick={handleSubmit}>
                <SendIcon/>
            </IconButton>        
        </form>
        )
    
    return(
        <>
        {/* for width less tuan 768px */}
        <div className={classes.appBar}>
            <Toolbar className={classes.searchbar}>
                {CommonInput}
            </Toolbar>
        </div>
        
        {/* for width more than 766px */}
        <div component={Paper} className={classes.root} >
            <div className={classes.content}>
               {CommonInput}            
            </div>
        </div>       
        
        </>
        );
}

export default MessagesInput;
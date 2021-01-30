import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme)=>({
    root:{
        maxWidth:'300px',
        textAlign:'center',
    },
    overview:{
        padding:'0.8rem',
        '& p':{
            color:'#38383897'
        }
    },
    btn:{
        borderTop:'1px solid #83838355'
    }
}))

const RegistrationErrorDialogBox = (props) => {
    const classes = useStyles();
    
    return(
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >  
        <div className={classes.root}>
            {props.children}
     {/*   { !props.resp ?
            <>
            <div className={classes.overview}>
            { props.type==='wrong_data' &&
            <Typography variant='h6' component='h6' style={{fontWeight:'500'}}>
                Incorrect credentials
            </Typography>
            }
            <Typography variant='caption' component='p' >
                {props.content}
            </Typography>
            </div>
            <div className={classes.options}>
                { props.type==='wrong_data' &&
                <Button fullWidth={true} onClick={props.close} className={classes.btn}>
                    Try Again
                </Button>
                }
                { props.type === 'email' &&
                <Button fullWidth={true} component={Link} to='/accounts/verify-email' className={classes.btn}>
                    Verify Your Email
                </Button>
                }
                { !props.type &&
                <Button fullWidth={true} onClick={props.close} className={classes.btn}>
                     Close
                </Button>
                }
            </div>
            </>
            :
            <div style={{'paddingTop':'0.8rem', paddingBottom:'0.8rem'}}>
                <CheckCircleOutlineIcon style={{width:'50px', height:'50px'}}/>
                <Typography variant='h6' component='h6' style={{fontWeight:'500', fontSize:'20px'}}>
                    Account Created Successfully
                </Typography>                
               <Typography variant='caption' component='p' style={{paddingLeft:'0.8rem', paddingRight:'0.8rem', color:'tomato'}} >
                  ** Please activate your account through the link we send on your provided email address (expires within 15 min). 
               </Typography>
            </div>
        }*/}
        </div>
        </Dialog>
        );
}


export default RegistrationErrorDialogBox;
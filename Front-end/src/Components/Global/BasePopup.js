import React, {useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
        position: 'fixed',
        left: 0,
        top: 0,
        overflow:'hidden',
        zIndex:100,
        '@media (min-width:768px)':{
            backgroundColor:'rgba(0,0,0,0.4)'
        } 
    },
    root2:{
        width:'100%',
        height:'100%',
        maxWidth:'935px',
        margin:'auto',
        '@media (min-width:768px)':{      
            display:'flex',
            flexWrap:'wrap',
            flexDirection:'column',
            justifyContent:'center',
            alignContent:'center',
            overflow:'hidden',
        }
    },
    root3:{
        backgroundColor:'white',
       '@media (min-width:768px)':{
           width:'100%',
           minWidth:'270px',
           maxWidth:'400px',
           height:'100%',
           minHeight:'200px',
           maxHeight:'400px',
           position:'relative',
           borderRadius:'20px',
           overflow:'hidden'
        } 
    },

}))

const BasePopup = (props) => {
    const classes = useStyles();
    const modalRef = useRef();
    
    useEffect(() => {
      disableBodyScroll(modalRef.current);
    return () => {
        enableBodyScroll(modalRef.current);
    }
    },[])
    
    return(
        <section 
        className={classes.root}
        ref={modalRef}
        onClick={() => props.history.goBack()}
        >
            <div className={classes.root2}>
                <div className={classes.root3} onClick={e => e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        </section>
        );
}

export default withRouter(BasePopup);






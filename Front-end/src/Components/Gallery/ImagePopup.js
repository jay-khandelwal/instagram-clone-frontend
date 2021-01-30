import React, {useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import CommonDesktopImageCard from './Global/CommonDesktopImageCard';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex:400,
        backgroundColor:'rgba(0,0,0, 0.4)',
        minHeight:'100%',
        overflowY:'auto',
    },
    root2:{
        width:'100%',
        height:'100%',
        maxWidth:'935px',
        margin:'auto',
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center'
    },
    root3:{
        width:'100%',
        '@media (min-width:768px)':{
            padding:'25px',
            paddingTop:'70px',
        }
    },
    container:{
        width:'100%',
        height:'100%',
        position:'relative',
        display:'flex',
        alignContent:'center'
    },
}));

const ImagePopup = (props) => {
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
            <div className={classes.root3}>        
                <div 
                className={classes.container}
                onClick={e => e.stopPropagation()}
                >   
                    <CommonDesktopImageCard slug={props.match.params.slug}/>
                </div>
            </div>
            </div>
        </section>                
        );
}

export default withRouter(ImagePopup);
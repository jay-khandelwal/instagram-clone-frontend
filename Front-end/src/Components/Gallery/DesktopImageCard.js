import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Appbar from '../Global/Navbar';
import CommonDesktopImageCard from './Global/CommonDesktopImageCard';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
        minHeight:'100%',
        backgroundColor:'white',
    },
    root2:{
        width:'100%',
        height:'100%',
        maxWidth:'935px',
        margin:'auto',
    },
    root3:{
        width:'100%',
        '@media (min-width:768px)':{
            padding:'20px',
            paddingTop:'90px',
        }
    },
    container:{
        width:'100%',
        position:'relative',
    },
}));

const DesktopImageCard = (props) => {
    const classes = useStyles();
    
    return(
        <section 
        className={classes.root}
        >
            <Appbar/>
            <div className={classes.root2}>
            <div className={classes.root3}>        
                <div className={classes.container} >
                    <CommonDesktopImageCard slug={props.slug}/>
                </div>
            </div>
            </div>
        </section>                
        );
}

export default DesktopImageCard;
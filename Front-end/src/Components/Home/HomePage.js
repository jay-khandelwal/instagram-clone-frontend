import React, { useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Appbar from '../Global/Navbar';
import BottomAppBar from '../Global/BottomBar';
import Status from './Global/Status';
import Cards from './Global/Cards';
import LoadBar from '../Global/LoadBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root:{
          width:'100%',
          height:'100%',
          backgroundColor:'white',
          paddingTop:'60px',
          position:'relative',
          boxSizing:'border-box',
      },      
      root2:{
          display:'flex',
          flexWrap:'wrap',
          justifyContent:'center',
          flexDirection:'column',
          width:'100%',
          maxWidth:'600px',
          margin:'auto',
          paddingTop:'10px',
          boxSizing:'border-box',
          padding:'0.8rem',
          [theme.breakpoints.up('md')]:{
              maxWidth:'614px'
          }
      },
      cardsStyle:{
          width:'100%',
          paddingBottom:'6rem',
          '@media (max-width:768px)':{
              paddingTop:'1rem'
          }
      },
  }),
);

const HomePage = (props) => {
    const classes = useStyles();
    const [shows, setShows] = useState(true);
    const [makeFocus, setMakeFocus] = useState(false);
    const [loading, setLoading] = useState(true);

    return(
        <div className={classes.root}>
        <Appbar home={true} makeFocus={makeFocus} />
        <div className={classes.root2} >
            { shows &&
             <Status/>
            }
            <div className={classes.cardsStyle} >
                <Cards setShows={setShows} setMakeFocus={setMakeFocus} setLoading={setLoading}/> 
              {/*  <CardsContainer/>*/}
            </div>
        </div>
        {loading &&
        <LoadBar/>
        }
        <BottomAppBar/>
        </div>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};


export default connect(mapStateToProps)(HomePage);



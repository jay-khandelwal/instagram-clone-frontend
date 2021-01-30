import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from "react-loader-spinner";

import { HOST_URL, renderTimestamp } from "../Settings";
import CommonCard from '../Components/Home/Global/CommonCard';

const useStyles = makeStyles((theme) => ({
  main:{
      width:'100%',
      height:'100%',
      backgroundColor:'white',
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
  root_root:{
  },
  root: {
    backgroundColor:'white',
    marginBottom:'0.8rem',
    width:'100%',
    [theme.breakpoints.up('sm')]:{
           marginBottom:'0.8rem',
     },
    '@media (min-width:604px)':{
         border:'1px solid #6565653c'
    }
  },
  card: {
      width:'100%',
      marginBottom: theme.spacing(2),
  },
  mediask: {
    height: 190,
    '@media (min-width:768px)':{
        height:400,
    }
  },  
}));


const Cards = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));   
    const [load, setLoad] = useState(false);
    const [posts, setPosts] = useState([]);
    const initialData = {
        next_url:null,
        count:null,
    }
    const [aData, SetAData] = useState(initialData);
    const [pagee, setPagee] = useState(1);
    const [nextLoader, setNextLoader] = useState(false);
    const firstTime = useRef(true)

    const observer = useRef()
    
    const username = props.match.params.username
    
    useEffect(()=>{
        if (pagee > 1 && aData.next_url !== null && firstTime.current===false){
            setNextLoader(true)
          axios.get(aData.next_url, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp=>{
                setPosts([...posts, ...resp.data.results])
                setNextLoader(false)
                SetAData({
                    next_url:resp.data.next_url,
                    count:resp.data.count,
                })
            })
            .catch(error=>{
                setNextLoader(false)
            })                         
        }
    }, [pagee])    
    
    useEffect(()=>{
        setLoad(true)
        const url = `${HOST_URL}/posts/feeds/${username}/` 
          axios.get(url, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp=>{
                setPosts(resp.data.results)
                SetAData({
                    next_url:resp.data.next_url,
                    count:resp.data.count,
                })
                firstTime.current = false
                setLoad(false)
            })
            .catch(error=>{
                setLoad(false)
            })             
    }, [])
    
    
    const lastElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPagee(p=> p + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [])   
    

    const cardSkeleton = (
    <Card className={classes.card}>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        title={
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
        <Skeleton animation="wave" variant="rect" className={classes.mediask} />

      <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
      </CardContent>
    </Card>        
        )
        
    var cards;

    if (upMd){
        cards = posts.map((feed, index)=>{
            if (posts.length === index+1){
                return (
                    <div key={feed.id} className={classes.root} ref={lastElementRef} >
                    <CommonCard user={feed.user} image={feed.image} slug={feed.slug} liked={feed.liked} saved={feed.saved} likes={feed.likes} caption={feed.caption} comments={feed.comments} timestamp={renderTimestamp(feed.timestamp)} token={props.token} owner={feed.owner} />
                    </div>
                    )
            }
            else{
                return (
                    <div key={feed.id} className={classes.root}>
                    <CommonCard user={feed.user} image={feed.image} slug={feed.slug} liked={feed.liked} saved={feed.saved} likes={feed.likes} caption={feed.caption} comments={feed.comments} timestamp={renderTimestamp(feed.timestamp)} token={props.token} owner={feed.owner} />
                    </div>
                    )
            }
        })
    }
    else{
        cards = posts.map((feed, index)=>{
            if (posts.length === index+1){
                return (
                    <Card key={feed.id} className={classes.root} ref={lastElementRef}>
                    <CommonCard user={feed.user} image={feed.image} slug={feed.slug} liked={feed.liked} saved={feed.saved} likes={feed.likes} caption={feed.caption} comments={feed.comments} timestamp={renderTimestamp(feed.timestamp)} token={props.token} owner={feed.owner} />
                    </Card>
                    )
            }
            else{
                return (
                    <Card key={feed.id} className={classes.root}>
                    <CommonCard user={feed.user} image={feed.image} slug={feed.slug} liked={feed.liked} saved={feed.saved} likes={feed.likes} caption={feed.caption} comments={feed.comments} timestamp={renderTimestamp(feed.timestamp)} token={props.token} owner={feed.owner} />
                    </Card>
                    )
            }
        })
    }  
    
    
    return(
        <div className={classes.main}>
        <div className={classes.root2}>
        <div className={classes.root_root}>
            {cards}
            { load &&
            <>
                {cardSkeleton}
                {cardSkeleton}
                {cardSkeleton}
            </>
            }
            { nextLoader &&
            <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="Oval" color="#939ea1" height={30} width={30} />
            }
       
        </div>        
        </div>        
        </div>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token,
    };
};


export default connect(mapStateToProps)(Cards);


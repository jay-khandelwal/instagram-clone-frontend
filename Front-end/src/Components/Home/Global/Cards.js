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
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";

import * as authActions from "../../../Store/Actions/Auth";
import * as feedsActions from "../../../Store/Actions/Feeds";
import { HOST_URL, renderTimestamp } from "../../../Settings";
import CommonCard from './CommonCard';
import UserItem from '../../Global/UserItem';

const useStyles = makeStyles((theme) => ({
  root_root:{
      '@media (max-width:768px)':{
      }      
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
  noContent:{
      position: 'fixed',
      top: '50%',
      left: '50%',
      msTransform: 'translateX(-50%) translateY(-50%)',
      webkitTransform: 'translate(-50%,-50%)',
      transform: 'translate(-50%,-50%)',
      textAlign:'center',
      width:'80%',
  },
  adminProfile:{
      margin:'auto',
      marginTop:'2rem',
      border:'1px solid #6565653c',
      padding:'0.3rem',
      textAlign:'left',
      maxWidth:'270px',
      backgroundColor:'#f3f5f6'
  }
}));


const Cards = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));   
    const [load, setLoad] = useState(false);
    const [loads, setLoads] = useState(false);
    const initialData = {
        next_url:null,
        count:null,
    }
    const [aData, SetAData] = useState(initialData);
    const [noContent, setNoContent] = useState(false);
    const [adminUser, setAdminUser] = useState([]);
    const [pagee, setPagee] = useState(1);
    const [nextLoader, setNextLoader] = useState(false);
    const firstTime = useRef(true)
    const history = useHistory();
    const observer = useRef()
    
    useEffect(()=>{
        if (pagee > 1 && aData.next_url !== null && firstTime.current===false){
            setNextLoader(true)
          axios.get(aData.next_url, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp=>{
                props.addFeeds(resp.data.results)
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
        const url = `${HOST_URL}/posts/feeds/` 
          axios.get(url, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp=>{
                if (resp.status !==204){
                    props.setFeeds(resp.data.results)
                    SetAData({
                        next_url:resp.data.next_url,
                        count:resp.data.count,
                    })
                    firstTime.current = false
                }
                else {
                    setNoContent(true)
                    props.setShows(false)
                }   
                setLoad(false)
                props.setLoading(false)
            })
            .catch(error=>{
                if (!error.response){
                    props.nerror()
                }
                setLoad(false)
                props.setLoading(false)
            })             
    }, [])
    
    useEffect(()=>{
        if (noContent === true){
            setLoads(true)
            const url = `${HOST_URL}/accounts/get-superuser/`
            axios.get(url, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp=>{
                setAdminUser(resp.data.results)
                setLoads(false)
            })
            .catch(error=>{
                setLoads(false)
            })
        }
        
    }, [noContent])
    
    
    const lastElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPagee(p=> p + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [])   
    
    
    const likeBtnHandler = (slug) => {
        const temp_data = [...props.feeds]
        var index = temp_data.findIndex(obj => obj.slug === slug);
        const liked = temp_data[index].liked
        temp_data[index].liked = !(liked)
        if (temp_data[index].liked){
            temp_data[index].likes = temp_data[index].likes + 1
        }
        if (temp_data[index].liked===false){
            temp_data[index].likes = temp_data[index].likes - 1
        }
        props.setFeeds(temp_data)
        
        const url = `${HOST_URL}/posts/post/like/`
        axios.post(url, {slug:slug, liked: liked}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
        })
        .catch(error=>{
        })
    }

    const saveBtnHandler = (slug) => {
        const temp_data = [...props.feeds]
        var index = temp_data.findIndex(obj => obj.slug === slug);
        const saved = temp_data[index].saved
        temp_data[index].saved = !(saved)
        props.setFeeds(temp_data)
        
        
        const url = `${HOST_URL}/posts/save/`
        axios.post(url, {slug:slug, saved: saved}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
        })
        .catch(error=>{
        })
    }  
    
    const handleExplore = () => {
        if (upMd) {
            props.setMakeFocus(true)
        }
        else{ 
            history.push('/explore')
        }
    }

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
        cards = props.feeds.map((feed, index)=>{
            if (props.feeds.length === index+1){
                return (
                    <div key={feed.id} className={classes.root} ref={lastElementRef} >
                    <CommonCard user={feed.user} image={feed.image} slug={feed.slug} liked={feed.liked} saved={feed.saved} likes={feed.likes} caption={feed.caption} comments={feed.comments} timestamp={renderTimestamp(feed.timestamp)} saveBtnHandler={saveBtnHandler} likeBtnHandler={likeBtnHandler} token={props.token} owner={feed.owner} />
                    </div>
                    )
            }
            else{
                return (
                    <div key={feed.id} className={classes.root}>
                    <CommonCard user={feed.user} image={feed.image} slug={feed.slug} liked={feed.liked} saved={feed.saved} likes={feed.likes} caption={feed.caption} comments={feed.comments} timestamp={renderTimestamp(feed.timestamp)} saveBtnHandler={saveBtnHandler} likeBtnHandler={likeBtnHandler} token={props.token} owner={feed.owner} />
                    </div>
                    )
            }
        })
    }
    else{
        cards = props.feeds.map((feed, index)=>{
            if (props.feeds.length === index+1){
                return (
                    <Card key={feed.id} className={classes.root} ref={lastElementRef}>
                    <CommonCard user={feed.user} image={feed.image} slug={feed.slug} liked={feed.liked} saved={feed.saved} likes={feed.likes} caption={feed.caption} comments={feed.comments} timestamp={renderTimestamp(feed.timestamp)} saveBtnHandler={saveBtnHandler} likeBtnHandler={likeBtnHandler} token={props.token} owner={feed.owner} />
                    </Card>
                    )
            }
            else{
                return (
                    <Card key={feed.id} className={classes.root}>
                    <CommonCard user={feed.user} image={feed.image} slug={feed.slug} liked={feed.liked} saved={feed.saved} likes={feed.likes} caption={feed.caption} comments={feed.comments} timestamp={renderTimestamp(feed.timestamp)} saveBtnHandler={saveBtnHandler} likeBtnHandler={likeBtnHandler} token={props.token} owner={feed.owner} />
                    </Card>
                    )
            }
        })
    }  
    
    
    return(
        <div className={classes.root_root}>
            { !noContent ?
            <>
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
            </>
            :
            <div className={classes.noContent}>
                <Typography variant='h5' style={{fontWeight:'300'}}>
                    Welcome to Instagram
                </Typography>
                <Typography variant='caption' style={{color:'gray'}}>
                    When you follow people, you'll see the photos and videos they post here.
                </Typography>
                <br/>
                <Button variant="outlined" color="primary" onClick={handleExplore} style={{marginTop:'0.5rem', color:'#0095f6', borderColor:'#0095f6', maxWidth:'120px', width:'80%'}}>
                    Explore +
                </Button>
                <div className={classes.adminProfile}>
                <Typography variant='h6' style={{textAlign:'left', fontWeight:'300', fontSize:'20px', borderBottom:'1px solid #6565653c', paddingLeft:'0.4rem'}}>
                    ADMIN
                </Typography>  
                {loads &&
                <Loader
                  type='Rings'
                  width={40}
                  height={40}
                  color='#9c9c9c'
                  style={{width:'100%', marginTop:'0.4rem', padding:'0.8rem', display:'flex', justifyContent:'center'}}
                /> 
                }
                { adminUser.map((user)=>(
                <UserItem key={user.id} first={user.username} second={user.full_name} profile_pic={user.profile_pic} type={user.userType} />
                ))
                }
                </div>
            </div>
            }
        </div>        
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token,
        feeds:state.feeds.feeds,
    };
};

const mapDispatchToProps = dispatch => {
    return{
        setFeeds: feeds => dispatch(feedsActions.setFeeds(feeds)),
        addFeeds: feeds => dispatch(feedsActions.addFeeds(feeds)),
        nerror: () => dispatch(authActions.nerror()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cards);


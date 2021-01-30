import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from "react-loader-spinner";

import GridImg from '../Components/Profile/Global/GridImg';
import { HOST_URL } from "../Settings";

const useStyles = makeStyles((theme) => ({
    gallery:{
         display: 'flex',
         flexWrap: 'wrap',
         justifyContent: 'flex-start',
         position:'relative',
         margin:'0px',
    }
}));

const Profile = (props) => {
    const classes = useStyles();
    const initialData = {
        posts:[],
        next_url:null,
        count:null,
    }
    const [posts, setPost] = useState(initialData)
    const [pagee, setPagee] = useState(1);
    const [loading, setLoading] = useState(false);
    const [nextLoader, setNextLoader] = useState(false);
    const firstTime = useRef(true)
    const observer = useRef()
    
    const username = props.match.params.username
    
    
    useEffect(()=>{
        if (pagee > 1 && posts.next_url !== null && firstTime.current===false){
            setNextLoader(true)
            axios.get(posts.next_url, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp=>{
                setPost({
                posts:[...posts.posts, ...resp.data.results],
                next_url:resp.data.next_url,
                count:resp.data.count
                })
                setNextLoader(false)
            })
            .catch(error=>{
                setNextLoader(false)
            })                         
        }
    }, [pagee]) 
    
    useEffect(() => {
        setLoading(true)
        axios.get(`${HOST_URL}/posts/list/${username}/`, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            setPost({
                posts:resp.data.results,
                next_url:resp.data.next_url,
                count:resp.data.count
            })
            setLoading(false)
            firstTime.current = false
        })
        .catch(error => {
            setLoading(false)
        })
    },[props.token, username])
    
    const lastElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPagee(p=> p + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [])       
    
    const gridImages = posts.posts.map((post, index)=>{
        if (posts.posts.length === index + 1){
            return (
                <>
                <GridImg
                key={post.id}
                image = {post.image}
                slug = {post.slug}
                />
                <div ref={lastElementRef}></div>
                </>
            )
        }
        else{
            return (
            <GridImg
            key={post.id}
            image = {post.image}
            slug = {post.slug}
            />
            )
        }
            
    })    

    return(
        <div className={classes.gallery}>
            {loading &&
            <Loader
              type='Rings'
              width={40}
              height={40}
              color='#9c9c9c'
              style={{width:'100%', marginTop:'0.4rem', display:'flex', justifyContent:'center'}}
            />
            }
            {gridImages}
            { nextLoader &&
            <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="Oval" color="#939ea1" height={30} width={30} />
            }            
        </div>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(Profile);
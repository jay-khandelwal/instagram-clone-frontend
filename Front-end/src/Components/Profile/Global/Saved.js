import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Loader from "react-loader-spinner";

import GridImg from './GridImg';
import { HOST_URL } from "../../../Settings";

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
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noContent, setNoContent] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        axios.get(`${HOST_URL}/posts/saved/`, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            if (resp.data && resp.data.results.length > 0){
                setPost(resp.data.results)
            }
            else{
                setNoContent(true)
            }
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
        })
    },[props.token])    
    
    const gridImages = posts.map((post)=>(
        <GridImg
        key={post.id}
        image = {post.image}
        slug = {post.slug}
        />
    ))    

    return(
        <>
        { !noContent ?
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
        </div>
        :
        <Typography variant='h5' style={{textAlign:'center', margin:'auto', paddingTop:'1rem', width:'100%', fontSize:'12px'}}>
            When you save posts, you see them here.
        </Typography>
        }
        </>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(Profile);
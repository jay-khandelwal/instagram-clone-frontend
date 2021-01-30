import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import ButtonBase from '@material-ui/core/ButtonBase';
import { NavLink, Link, useParams, Route } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import AppsIcon from '@material-ui/icons/Apps';
import ViewDayOutlinedIcon from '@material-ui/icons/ViewDayOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SecurityIcon from '@material-ui/icons/Security';
import { connect } from 'react-redux';
import { useHistory, withRouter } from "react-router-dom";

import Appbar from '../Global/Navbar';
import BottomAppBar from '../Global/BottomBar'; 
import ProfilePicDialogBox from './Global/ProfilePicDialogBox';
import DetailBtn from './Global/DetailBtn';
import LoadBar from '../Global/LoadBar';
import { HOST_URL } from "../../Settings";
import Profile from '../../Pages/Profile';
import ProfileFeed from '../../Pages/ProfileFeed';
import Saved from './Global/Saved';
import FollowPopup from '../Global/FollowPopup';
import * as authActions from "../../Store/Actions/Auth";
import Page404 from '../../Pages/Page404';

const useStyles = makeStyles((theme) => ({
    root:{
        paddingTop:'60px', 
        paddingBottom:'70px', 
        height:'100%', 
        backgroundColor:'white',
        position:'relative',
        overflow:'auto'
    },
    content:{
         margin:'auto',
         maxWidth:'975px',
         position:'relative',
         paddingBottom:'6rem',
         [theme.breakpoints.up('md')]:{
          padding:'20px',
         },
    },
    root2:{
        minHeight:'20%',
        padding:'2rem',
      [theme.breakpoints.between('xs', 'sm')]: {
          padding:'1rem'
      },              
    },
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
      position:'relative',
      [theme.breakpoints.between('xs','sm')]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },      
    },
    imager:{
        width:'30%',
        marginRight:'30px',
        display:'flex',
        justifyContent:'center',
    },
    avatar:{
        '@media (min-width:768px)':{
            height:'150px',
            width:'150px',
        }
    },
    gridone:{
        display:'flex',
        justifyContent:'flex-start'
    },
    gridtwo:{
        width:'100%',
    },
    btn:{
        color:'black',
        borderColor:'#e0dcdc'
    },
    btn2:{
        paddingLeft:'0px',
        margin:'0.3rem',
    },
    grid2content:{
        margin:'0.3rem auto',
    },
    detailbtn:{
        width:'33.33%',
        '& span':{
            display:'block'
        }
    },
    overviewp:{
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
    },
    displayUpMd:{
        '@media (max-width:768px)':{
            display:'none',
        }
    },
    displayDownMd:{
        '@media (min-width:768px)':{
            display:'none',
        }
    },
    privateContent:{
        width:'100%',
        minHeight:'200px',
        height:'100%',
        textAlign:'center',
        padding:'1rem 1.2rem'
    },
    noPosts:{
        width:'100%',
        display:'flex',
        justifyContent:'flex-start',
        '@media (min-width:768px)':{
            justifyContent:'center'
        }
    },
    noPostsContent:{
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
        padding:'0.4rem 0.4rem',
        '@media (min-width:768px)':{
            flexWrap:'wrap',
            flexDirection:'column',
        }
    },
    cmContent:{
        margin:'auto',
        padding:'0.5rem',
    },
    cmIcon:{
        padding:'0.4rem', 
        border:'1px solid black',
        borderRadius:'100%', 
        fontSize:'3rem'
    },
    noPostsText:{
        margin:'auto',
        padding:'0.6rem',
        '@media (min-width:768px)':{
            textAlign:'center',
        }
    },
    activeStyle:{
        color:'#7ac2eb'
    }
}));

// used by count() method to count the occurrence of '/'

String.prototype.count=function(s1) { 
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
}

const ProfilePage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const {username} = useParams();
    const {location} = props ;
    const IsMainProfilePage = (location.pathname.count('/') === 1 ? true : false)
    const isSavedPage = (location.pathname.includes('/saved') ? true : false)
    const [loading, setLoading] = useState(false);
    const [noProfile, setNoProfile] = useState(false);
   
    const initialData ={
        username:'',
        full_name:'',
        bio:'',
        profile_pic:'',
        friends:{},
        privacy:'',
        userType:'',
        posts:'',
    }
    const [data, setData] = useState(initialData);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    }; 
    
    const [openFoll, setOpenFoll] = useState(false);
    const handleClickOpenFoll = (e) => {
      e.stopPropagation();
      setOpenFoll(true);
    };
    const handleCloseFoll = () => {
      setOpenFoll(false);
    }; 
    
    const btnDiasable = (!( (!data.privacy) ||  ( (data.privacy) && ((data.userType==='owner') || (data.userType==='following')) ) ))

    useEffect(() => {
        if (props.token){
            setLoading(true)
            axios.get(`${HOST_URL}/accounts/profile/${username}/`, {
                headers:{
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(resp => {
                setLoading(false)
                setData(resp.data)
            })
            .catch(error => {
                setLoading(false)
                if (!error.response){
                    props.nerror()
                }
                if (error.response.data && error.response.data.detail ==='No_Profile_Found'){
                    setNoProfile(true)
                }
            })            
        }
        else{
            history.push('/login')
        }
    }, [props.token, username, history, props.nerror])  
    
    const sendRequestHandler = () => {
        const url = `${HOST_URL}/frequest/send/`
        axios.post(url, {receiver:username} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        } )
        .then(resp => {
            setData({
                ...data,
                userType:'requested'
            })
        })  
        .catch(error=> {
        })
    }
    
    const cancelRequestHandler = () => {
        const url = `${HOST_URL}/frequest/cancel/`
        axios.post(url, {receiver:username} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        } )
        .then(resp => {
            setData({
                ...data,
                userType:'follow'
            })
        })  
        .catch(error=> {
        })
    }  
    
    const unfollowHandler = () => {
        const url = `${HOST_URL}/profile/unfollow/`
        axios.post(url, {anotherUser:username} , {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        } )
        .then(resp => {
            setData({
                ...data,
                userType:'follow'
            })
            handleCloseFoll()
        })  
        .catch(error=> {
        })
    }
    
    const MessageBtnHandler = () => {
        const url = `${HOST_URL}/chat/room/`
        axios.post(url, {userTwo:username}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            if (resp.data.roomId){
               history.push(`/direct/chat/${resp.data.roomId}`)
            }
        })
        .catch(error=>{
        })
    }
   
    const changeProfilePic = (pic) => {
        setData({
            ...data,
            profile_pic:pic
        })
    }
    
    const theme = useTheme();
    const isWidthMore = useMediaQuery(theme.breakpoints.up('md'));
    
    const overview = (
        <>
             <Typography variant='h5' style={{fontSize:'20px'}}>
                {data.full_name}
             </Typography>
             <Typography variant='body2' component='p' className={classes.overviewp}>
                {data.bio}
             </Typography>       
        </>
        )
        
    const buttons = (
        <>
        { data.userType==='follow' ?
        <>
            <Button 
            variant="outlined" 
            className={`${classes.grid2content} ${classes.btn}`}
            fullWidth={!isWidthMore}
            onClick={sendRequestHandler}
            >
                Follow
            </Button> 
        </>   
        : null}
        { data.userType==='owner' ?
        <>
            <Button 
            variant="outlined" 
            className={`${classes.grid2content} ${classes.btn}`}
            fullWidth={!isWidthMore}
            component={NavLink}
            to='/accounts/edit'
            >
                Edit Profile
            </Button> 

        </>   
        : null}
        { data.userType==='follower' ?
        <>
            <Button 
            variant="outlined" 
            className={`${classes.grid2content} ${classes.btn}`}
            fullWidth={!isWidthMore}
            onClick={sendRequestHandler}
            >
                Follow Back
            </Button> 
        </>   
        : null}
        { data.userType==='following' ?
        <>
            <Button 
            variant="outlined" 
            className={`${classes.grid2content} ${classes.btn}`}
            onClick={MessageBtnHandler}
            >
                Messsage
            </Button> 
            <IconButton color="inherit" onClick={handleClickOpenFoll}>
                <PersonIcon/>
             </IconButton>                  
        </>   
        : null}
        { data.userType==='requested' ?
        <>
            <Button 
            variant="outlined" 
            className={`${classes.grid2content} ${classes.btn}`}
            onClick={cancelRequestHandler}
            >
                requested
            </Button> 
        </>   
        : null}
        </>
    )  
    
    return(
        <>
        { !noProfile ?
        <section className={classes.root}>
        <Appbar profile name={username} type={data.userType} />

        <>
        { !loading ? 
        (<div className={classes.content}>
        <Grid container justify='center' alignContent='center' className={classes.root2}>
            <Grid item xs={12} className={classes.gridone} >
            
               <div className={classes.imager}>
                   <ButtonBase 
                   onClick={ data.userType==='owner' ? handleClickOpen : null} 
                   className={classes.avatar} 
                   
                   component='div'
                   >
                   <Avatar alt="Remy Sharp" src={data.profile_pic} className={classes.large} /> 
                   </ButtonBase> 
               </div>
               
                <div className={classes.gridtwo} >
                    <Typography variant='h5' className={classes.grid2content}  >
                        {data.username}
                    </Typography>
                    {buttons}
                    <div className={classes.displayUpMd}>
                    <Button component='span' className={classes.btn2} disabled={btnDiasable}>
                        {data.friends.posts} Posts
                    </Button>
                    <Button 
                    component={Link} 
                    disabled={btnDiasable}
                    to={{pathname: `/${username}/followers`, state: { isModal: true } }}
                    className={classes.btn2}>
                        {data.friends.followers} Followers
                    </Button>
                    <Button 
                    component={Link} 
                    disabled={btnDiasable}
                    to={{pathname: `/${username}/followings`, state: { isModal: true } }}
                    className={classes.btn2}>
                        {data.friends.followings} Following
                    </Button>          
                    </div>
                    <div className={classes.displayUpMd}>
                         {overview}
                    </div>
                </div>               
                
            </Grid>
            <Grid className={classes.displayDownMd} item xs={11} style={{marginTop:'0.5rem'}}>
                {overview}
            </Grid>
            <Grid xs item />
        </Grid>
        
        <div className={classes.displayDownMd}>
        <DetailBtn username={username} followers={data.friends.followers} followings={data.friends.followings} posts={data.friends.posts} disable={btnDiasable} />
        </div>
        
        
        { ( (!data.privacy) ||  ( (data.privacy) && ((data.userType==='owner') || (data.userType==='following')) ) ) ?
        <div style={{width:'100%'}}>
            <div style={{width:'100%', display:'flex', justifyContent:'space-evenly', overflow:'hidden'}}>
               <IconButton 
               className={`${classes.icon} ${IsMainProfilePage && classes.activeStyle}`}
               component={NavLink}
               to={`/${username}`}
               >
                   <AppsIcon/>
               </IconButton> 
               <IconButton 
               className={classes.icon}
               component={NavLink}
               to={`/${username}/feed`}
               activeClassName={classes.activeStyle}
               >
                   <ViewDayOutlinedIcon/>
               </IconButton> 
               { data.userType==='owner' &&
               <IconButton 
               className={classes.icon}
               component={NavLink}
               to={`/${username}/saved`}
               activeClassName={classes.activeStyle}
               >
                   <BookmarkBorderOutlinedIcon/>
               </IconButton> 
               }
            </div> 
            
            <div>
            { data.posts &&
                <Route exact path='/:username' component={Profile} />
            }
                <Route exact strict path='/:username/feed' component={ProfileFeed} />
                <Route exact strict path='/:username/saved' component={Saved} />            
            </div>

        </div>
        : 
        <div className={classes.privateContent}>
            <SecurityIcon/>
            <br/>
            <Typography variant='overview' >
               <b> This Account Is Private.</b>
            </Typography>
            <br/>
            <Typography variant='caption'>
                You need to follow this account in order to view their posts.
            </Typography>
        </div>
        }
        
        { !isSavedPage &&
        <>
        { ( (!data.posts) && (!data.posts && data.userType !== 'owner' && data.privacy && data.userType==='following') || (!data.posts && data.userType !== 'owner' && !data.privacy) || (!data.posts && data.userType==='owner') ) &&
        <div className={classes.noPosts}>
        <div className={classes.noPostsContent}>
            <div className={classes.cmContent}>
                <PhotoCameraIcon className={classes.cmIcon}/>
            </div>
            <div className={classes.noPostsText}>
                <Typography variant='caption'>
                   <b> No Posts Yet </b>
                </Typography><br/>
                <Typography variant='caption' style={{color:'#2d2f3dcf'}}>
                   {` When ${data.userType==='owner' ? 'you' : username} posts, you 'll see ${data.userType==='owner' ? 'you' : 'their'} photos and videos here.`}
                </Typography>
            </div>
        </div>
        </div>
        }
        </>
        }
        
        </div>)
        :
        <LoadBar/>
        }
        <ProfilePicDialogBox open={open} onClose={handleClose} username={username} changeProfilePic={changeProfilePic} profile_pic={data.profile_pic}/>
        <FollowPopup open={openFoll} close={handleCloseFoll} username={username} profile_pic={data.profile_pic} unfollowHandler={unfollowHandler}/>
        </>
        
        <BottomAppBar/>
        </section>
        :
        <Page404/>
        }
        </>
        );
}


const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return{
        nerror: () => dispatch(authActions.nerror()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));



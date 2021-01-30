import React, {useState,useRef, useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TelegramIcon from '@material-ui/icons/Telegram';
import { NavLink, Link, useHistory } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { HOST_URL } from "../../Settings";
import Logout from '../../Pages/Logout';
import * as profileActions from '../../Store/Actions/Profile';
import UserItem from '../Explore/UserItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
    },
    grow: {
      flexGrow: 1,
      
    },
    appbar:{
        height:'60px',
        backgroundColor:'white',
        color:'black',
        width:'100%',
        position:'fixed',
        top:0,
        left:0,
        zIndex:10,
        borderBottom:'1px solid #dbdbdb',
    },
    toolbarStyle:{
        '@media (min-width:975px)':{
            width:'975px',
            margin:'auto'
        }        
    },
    search: {
      position: 'relative',
      display:'none',
      border:'1px solid #c5c5c587',
      [theme.breakpoints.up('md')]: {
        width: 'auto',
        display:'block'
      },
    },
    search2: {
      position: 'relative',
      border:'1px solid #c5c5c587',
      [theme.breakpoints.up('md')]: {
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      position:'relative',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    iconone:{
        padding:'4px'
    },
    icontwo:{
        border:'3px solid gray',
        color:'gray',
        padding:'1px'
    },
    input: {
        display: 'none',
    },
  }),
);

const Appbar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const searchRef = useRef(null);
  const searchDivRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [searchesOpen, setSearchesOpen] = useState(false);
  const handleClickOpen = () => {
  handleMenuClose()
  setOpen(true);
  };
  const handleClose = () => {
  setOpen(false);
  };   
  const isMenuOpen = Boolean(anchorEl);
  
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handlePostImage = (e) => {
      const image = e.target.files[0]
      props.UploadImageFile(image)
      history.push('/create/detail')
  }
  
  useEffect(()=>{
      if (props.makeFocus){
          searchRef.current.focus();
      }
  }, [props.makeFocus])
    
  useEffect(()=>{
          let handler = event => {
              if (searchDivRef.current && !searchDivRef.current.contains(event.target)){
                  setSearchesOpen(false)
              }
          }
          document.addEventListener('mousedown', handler)
          return () => {
              document.removeEventListener('mousedown', handler)
          }
  }, [searchDivRef])

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={NavLink} to={`/${props.username}`} onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem component={NavLink} to={`/${props.username}/saved`} onClick={handleMenuClose}>Saved</MenuItem>
      <MenuItem component={NavLink} to='/accounts/edit' onClick={handleMenuClose}>Settings</MenuItem>
      <hr/>
      <MenuItem onClick={handleClickOpen}>Log Out</MenuItem>
    </Menu>
  );
  
    let cancelToken;
    const handleSearchChange = (e) => {
      const searchTerm = e.target.value;
      if (searchTerm !== ''){
          if (typeof cancelToken != typeof undefined) {
          cancelToken.cancel("Operation canceled due to new request.");
          }
          
          cancelToken = axios.CancelToken.source();
          
          const url = `${HOST_URL}/accounts/search/?search=${searchTerm}`
          
          axios.get(url, { cancelToken: cancelToken.token, headers:{'Authorization': `Token ${props.token}`} })
          .then(resp=>{
              setData(resp.data.results)
              setSearchesOpen(true)
          })
          .catch(error=>{
          })          
      }
      if (searchTerm === ''){
          setData([])
      }
    }  

    const results = data.map(result=>
        <UserItem key={result.id} profile_pic={result.profile_pic} first={result.username} second={result.full_name} />
    )

  return (
    <div className={`${classes.grow} ${classes.root}`} >
        <div 
        position="fixed"
        className={classes.appbar}
        >
        
        <Toolbar className={classes.toolbarStyle}>
   
        { ((!upMd) && (props.home)) || (upMd)   ? 
          <Typography 
          className={classes.title}
          id= 'instagramtext'
          variant="h4" 
          noWrap>
            Instagram
          </Typography>
          :
          null
        }
      
        
        <div className={classes.sectionMobile}>
            { props.direct || props.chat ?
            <>
            <IconButton className={classes.iconone} >
                <ArrowBackIosIcon/>
            </IconButton>  
            </>
            :
            null
            }
            
            { props.chat &&
            <>
            { !props.loading ?
            <>
            <div style={{padding:'0.6rem'}}>
            <Avatar aria-label="qldk" className={classes.avatar} src={props.profile_pic}/>
         {/*   <UserBadge profile_pic={props.profile_pic}/>*/}
            </div>
            <div style={{marginTop:'auto', marginBottom:'auto'}}>
                <Typography component="h5" variant="h6" >
                    {props.full_name}
                </Typography>
            {/*    <span>active</span>*/}
            </div>
            </>
            :
            <>
            <Skeleton variant="circle">
              <Avatar />
            </Skeleton>
            <Skeleton width='90px' style={{margin:'1rem'}} >
              <Typography>.</Typography>
            </Skeleton>
            </>            
            }
            </>
            }            
            
        </div>
        
          <div className={classes.grow} />   
            
          <div style={{display:'flex', position:'relative', justifyContent:'center'}} ref={searchDivRef}>
          <div 
          className={ (!props.explore) ? 
           classes.search
          : 
           classes.search2
          }
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={upMd ? handleSearchChange : props.searchHandler}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              inputRef={searchRef}
            />
          </div>
          
          { (data.length !== 0 && searchesOpen) &&
          <div style={{position:'absolute', overflowY:'auto', maxHeight:'200px', top:'38px', width:'100%', backgroundColor:'#ffffff', border:'1px solid #6565653c'}}>
            {results}
          </div>
          }
          </div>
          
          <div className={classes.sectionMobile}>
            
            { (props.profile) ? 
              <Typography 
              className={classes.title}
              id= 'instagramtext'
              variant="h6" 
              noWrap>
                {props.name}
              </Typography> 
              :
              null
            }  
            
            { (props.activity) ? 
              <Typography 
              className={classes.title}
              id= 'instagramtext'
              variant="h4" 
              noWrap>
                Activity
              </Typography> 
              :
              null
            } 
            
            { (props.direct) ? 
              <Typography 
              className={classes.title}
              id= 'instagramtext'
              variant="h4" 
              noWrap>
                Direct
              </Typography> 
              :
              null
            } 
            
          </div>           
          
          <div className={classes.grow} />
          
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" component={NavLink} to='/'>
                <HomeIcon/>
            </IconButton>
            <IconButton color="inherit" component={NavLink} to='/direct/inbox'>
                <Badge badgeContent={props.directcount} invisible={props.directcount===0 ? true : false} color="primary">
                <TelegramIcon/>
                </Badge>
            </IconButton>
            
            <input
                type="file"
                accept="image/png, image/jpeg"
                name='image'
                className={classes.input}
                id="contain-button-file"
                onChange={handlePostImage}
            />  
            <label htmlFor="contain-button-file">
            <IconButton color="inherit" component='span' >
                <AddIcon />
            </IconButton>
            </label>            
            
            <IconButton aria-label="show 17 new notifications" 
            component={Link} 
            color="inherit"
            to={{
            pathname: "/activity", state: { activity: true }
            }}
            >
              <Badge badgeContent={props.maincount} invisible={props.maincount===0 ? true : false} color="secondary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </div>
          
          <div className={classes.sectionMobile}>
          
            { (props.home) ? 
            <IconButton
            component={NavLink}
            to='/direct/inbox'
            >
                <Badge badgeContent={props.directcount} invisible={props.directcount===0 ? true : false} color="primary">
                    <TelegramIcon />
                </Badge>
            </IconButton>
            :
            null
            }
            
            { (props.direct) ? 
            <IconButton component={NavLink} to='/direct/new'
            >
              <CreateOutlinedIcon />
            </IconButton>
            :
            null
            }
            
            { props.chat ?
            <IconButton className={classes.icontwo} onClick={()=>props.setOpen(true)}>
                <PriorityHighRoundedIcon />
            </IconButton>   
            :
            null
            }
    
            { (props.profile && props.type==='owner') ?
            <IconButton component={Link} to='/settings' style={{position:'absolute', right:2, bottom:'-25px',}} >
                <SettingsIcon />
            </IconButton>               
            :
            null
            }
            
            
          </div> 
          
        </Toolbar>
      </div>
      {renderMenu}
      {open &&
      <Logout open={open} close={handleClose} />
      }
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return{
        UploadImageFile: (imageFile) =>
            dispatch(profileActions.uploadedImage(imageFile)),
    }
}

const mapStateToProps = state => {
    return{
        token:state.auth.token,
        username:state.auth.username,
        directcount:state.notifications.directcount,
        maincount:state.notifications.maincount,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);

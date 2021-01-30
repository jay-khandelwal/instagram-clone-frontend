
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { NavLink } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import Loader from "react-loader-spinner";

import UserItem from '../Global/UserItem';
import { HOST_URL } from "../../Settings";
import Loadeer from '../Global/Loader';

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        height:'100%',
        position:'relative',
        backgroundColor:'white',
    },
    toolbarStyle:{
        width:'100%',
        padding:'0.5rem',
        position:'sticky',
        zIndex:100,
        backgroundColor:'white',
        top:0,
        left:0,
    },
    toolbarone:{
        display:'flex',
        alighContent:'center',
        borderBottom:'1px solid #dbdbdb',
    },
    iconstyle:{
        width:'70px',
        display:'flex',
        alighContent:'center',
        marginLeft:'0.6rem',
        marginBottom:'0.4rem'
    },
    closeicon:{
       [theme.breakpoints.down('sm')]:{
           display:'none'
       }            
    },
    arrowicon:{
        [theme.breakpoints.up('md')]:{
           display:'none'
       }           
    },    
    mainText:{
        width:'100%',
        textAlign:'center',
    },
    nextBtn:{
        width:'70px',
    },
    toolbartwo:{
        display:'flex',
        borderBottom:'1px solid #dbdbdb'
    },
    tostyle:{
        width:'60px',
        padding:'10px 12px 4px 12px',
    },
    mainStyle:{
        width:'100%',
        display:'flex',
        flexWrap:'wrap',
        maxHeight:'100px',
        overflowY:'auto'
    },
    inputRoot:{
        width:'100%',
        fontSize:'14px',
        padding:'4px 12px'
    },
    selectedUser:{
        width:'auto',
        display:'flex',
        justifyContent:'center',
        alighContent:'center',
        padding:'1px 12px',
        margin:'4px',
        backgroundColor:'#298be4',
        color:'white',
        borderRadius:'8px'
    },
    selectedContent:{
        display:'flex',
        alighContent:'center',
        justifyContent:'center',
    },
    usernameStyle:{
        display:'block',
        fontSize:'14px',
        margin:'auto'
    },
    removeBtn:{
        marginLeft:'8px',
        color:'white'
    },
    innerContent:{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        padding:'0.3rem 0.5rem',
        overflowY:'auto',
    }
}));

const StartMssgPopup = (props) => {
    const classes = useStyles();
    const [selected, setSeleted] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [nextLoader, setNexLoader] = useState(false);
    const [noSearchedUsers, setNoSearchedUsers] = useState(false);
    const observer = useRef();
    const next_url1 = useRef(null);
    const next_url2 = useRef(null);
    const [redirect, setRedirect] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [loading, setLoading] = useState(false);
    const searchedText = useRef('');
    const isSearchedUsers = useRef(false);
   // const isSearchUsers = useRef(searchedUsers.length === 0 ? false : true)
    
    useEffect(() => {
        setLoading(true)
        const url = `${HOST_URL}/accounts/chat/user/`
        axios.get(url, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp=>{
            setChatUsers(resp.data.results)
            next_url1.current=resp.data.next_url
            setLoading(false)
        })
        .catch(error=>{
            setLoading(false)
        })
    }, [props.token])
    
    let cancelToken;
    const handleSearchChange = (e) => {
      const searchTerm = e.target.value;
      searchedText.current=searchTerm
      if (searchTerm !== ''){
          if (typeof cancelToken != typeof undefined) {
          cancelToken.cancel("Operation canceled due to new request.");
          }
          
          cancelToken = axios.CancelToken.source();
          
          const url = `${HOST_URL}/accounts/search/?search=${searchTerm}`
          
          axios.get(url, { cancelToken: cancelToken.token, headers:{'Authorization': `Token ${props.token}`} })
          .then(resp=>{
              if (resp.data.results.length===0){
                  setNoSearchedUsers(true)
                  setSearchedUsers([])
              }
              else{
                  setSearchedUsers(resp.data.results)
                  next_url2.current=resp.data.next_url
                  if (noSearchedUsers){
                      setNoSearchedUsers(false)
                  }
              }
              isSearchedUsers.current=true
          })
          .catch(error=>{
          })          
      }
      if (searchTerm === ''){
          setSearchedUsers([])
          isSearchedUsers.current=false
          if (noSearchedUsers){
              setNoSearchedUsers(false)
          }
      }
    }      
    
    const getNextPage = ()=>{
        if (!isSearchedUsers.current){
            if (next_url1.current !== null){
                setNexLoader(true)
                axios.get(next_url1.current,  {
                        headers:{
                            Authorization:`Token ${props.token}`
                        }
                    })
                    .then(resp=>{
                        setChatUsers((data)=>[...data, ...resp.data.results])
                        next_url1.current=resp.data.next_url
                        setNexLoader(false)
                    })
                    .catch(error=>{
                        setNexLoader(false)
                    })  
            }            
        }
        else{
            if (next_url2.current !== null){
                setNexLoader(true)
                axios.get(next_url2.current,  {
                        headers:{
                            Authorization:`Token ${props.token}`
                        }
                    })
                    .then(resp=>{
                        setSearchedUsers((data)=>[...data, ...resp.data.results])
                        next_url2.current=resp.data.next_url
                        setNexLoader(false)
                    })
                    .catch(error=>{
                        setNexLoader(false)
                    })  
            }            
        }
    }
    
    const lastElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                getNextPage()
            }
        })
        if (node) observer.current.observe(node)
    }, [getNextPage])           
    
    const removeUser = (username) => {
        const newSelectedUser = selected.filter(user=>{
            return user !== username;
        })
        setSeleted(newSelectedUser)
    }
    
    const selectHandler = (e) => {
        if (selected.includes(e.target.name)){
            removeUser(e.target.name)
        }
        else{
            setSeleted([...selected, e.target.name])
        }
    }

    const nextBtnHandler = () => {
        const url = `${HOST_URL}/chat/room/`
        axios.post(url, {userTwo:selected[0]}, {
            headers:{
                'Authorization': `Token ${props.token}`
            }
        })
        .then(resp => {
            setRoomId(resp.data.roomId)
            setRedirect(true)
        })
        .catch(error=>{
        })
    }

    const seletedUsers = selected.map(user=>(
        <div className={classes.selectedUser}>
        <div className={classes.selectedContent}>
            <div className={classes.usernameStyle}>
                {user}
            </div>
            <div className={classes.removeBtn}>
                <CloseIcon fontSize='small' style={{marginTop:'6px' }} onClick={()=>removeUser(user)}/>
            </div>
        </div>
        </div>                             
        ))
    
    const toolbar = (
        <div className={classes.toolbarStyle} >
            <div className={classes.toolbarone}>
        
            <div className={classes.iconstyle}>
                <IconButton component={NavLink} to='/direct/inbox' style={{padding:0}} >
                   <CloseIcon className={classes.closeicon}/>
                   <ArrowBackIosIcon className={classes.arrowicon}/>
                </IconButton>
            </div>
            
            <div className={classes.mainText}>
                <Typography component="h5" variant="h5" id='instagramtext'>
                           New Message
                </Typography>         
            </div>
            
            <div className={classes.nextBtn}>
                <Button onClick={nextBtnHandler} style={{color:'#009cfde8', fontWeight:600}}>Next</Button>            
            </div>

            </div>
            
            <div className={classes.toolbartwo}>
                <div className={classes.tostyle}>
                <Typography variant="subtitle1" >
                    <b> To :- </b>
                </Typography>  
                </div>
          
                <div className={classes.mainStyle}>
                     {seletedUsers}
                        <InputBase
                        placeholder="search…"
                        className={classes.inputRoot}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearchChange}
                        />    
                        
                </div>
            </div>
            
        </div>
        )
    const usersArray = (searchedText.current==='' ? chatUsers : searchedUsers)
        
    const all_users = usersArray.map((user, index) =>{
        if(usersArray.length === index + 1){
        return (
            <>
            <UserItem key={user.id} first={user.username} second={user.full_name} profile_pic={user.profile_pic} >
            <FormControlLabel
            style={{margin:'0px'}}
            control={
                <Checkbox 
                checked={selected.includes(user.username) ? true : false}
                onChange={selectHandler} 
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon style={{color:'#3890c6'}} />} 
                name={user.username} />
            }
            />                
            </UserItem>
            <div ref={lastElementRef}></div>
            </>
            )
        }
        else{
        return (            
             <UserItem key={user.id} first={user.username} second={user.full_name} profile_pic={user.profile_pic} >
            <FormControlLabel
            style={{margin:'0px'}}
            control={
                <Checkbox 
                checked={selected.includes(user.username) ? true : false}
                onChange={selectHandler} 
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon style={{color:'#3890c6'}} />} 
                name={user.username} />
            }
            />                
            </UserItem>
            )           
        }
        }
    )        
        
    if (redirect){
        return <Redirect to= {`/direct/chat/${roomId}`} />
    }
    
    return(
    
        <div className={classes.root}>
            {toolbar}
            { !loading ?
            <>
            { (searchedText.current === '' && chatUsers.length !== 0) &&
            <Typography variant='caption' style={{fontWeight:'600', padding:'0.3rem 0.5rem', fontSize:'14px'}}>
                Suggestions
            </Typography>  
            }
            { (noSearchedUsers || (chatUsers.length===0 && searchedText.current==='')) &&
            <Typography variant='caption' style={{fontWeight:'400', padding:'0.6rem 0.5rem', fontSize:'14px', width:'100%', textAlign:'center', color:'#b4b4b4'}}>
                No User Found.
            </Typography>  
            }            
            <div className={classes.innerContent}>
                {all_users}
                {nextLoader &&
                <Loader style={{width:'100%', display:'flex', justifyContent:'center'}} type="Oval" color="#696969" height={30} width={30} />
                }            
            </div>
            </>
            :
            <Loadeer/>
            }
        </div>
      
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(StartMssgPopup);


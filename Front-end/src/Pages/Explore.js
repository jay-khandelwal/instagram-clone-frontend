import React, {useState} from 'react';
import axios from 'axios';

import Appbar from '../Components/Global/Navbar';
import BottomAppBar from '../Components/Global/BottomBar'; 
import UserItem from '../Components/Explore/UserItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { HOST_URL } from "../Settings";

const Explore = (props) => {
    const [data, setData] = useState([]);
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md')); 
    
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
    
    return(
        <>
            <Appbar explore={true} searchHandler={handleSearchChange} makeFocus={upMd ? false : true}/>
            
                <div style={{paddingTop:'60px', width:'100%', height:'100%', overflowY:'auto', backgroundColor:'white'}}>
                    {results}
                </div>
            
            <BottomAppBar/>
        </>
        );
}

const mapStateToProps = state => {
    return{
        token:state.auth.token,
    };
};

export default connect(mapStateToProps)(Explore);



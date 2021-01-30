import React from 'react';
import Follows from '../Components/Profile/Follows';

const Followers = (props) => {
    return(
        <Follows followers username={props.match.params.username}/>
        );
}

export default Followers;
import React from 'react';
import Follows from '../Components/Profile/Follows';

const Followings = (props) => {
    return(
        <Follows username={props.match.params.username}/>
        );
}

export default Followings;
import React from 'react';
import { Redirect } from "react-router-dom";

const FollowRedirect = (props) => {
    const username = props.match.params.username
    return(
        <Redirect to={`/${username}`}/>
        );
}

export default FollowRedirect;
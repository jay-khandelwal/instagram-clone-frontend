import React from 'react';
import { Route, Redirect } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import ActivityPage from '../Components/Activity/ActivityPage';
import RequestRecv from '../Components/Activity/RequestRecv';
import RequestMade from '../Components/Activity/RequestMade';

const Activity = () => {
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));
    if (upMd) {
        return <Redirect to='/' />
    }
    else{
        return (
            <>
            <Route exact path='/activity/requests' component={RequestRecv} />
            <Route exact path='/activity' component={ActivityPage} />
            <Route exact path='/activity/requested' component={RequestMade} />
            </>
            )
    }
        
}

export default Activity;
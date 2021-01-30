import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import MobileImageCard from './MobileImageCard';
import DesktopImageCard from './DesktopImageCard';

const CardFinder = (props) => {
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));
    const slug = props.match.params.slug
    
    return(
        <>
        { upMd ?
            <DesktopImageCard slug={slug} />
        :
            <MobileImageCard slug={slug} />
        }
        </>
    );
}

export default CardFinder;
import React from 'react';
import BaseChatPage2 from './BaseChatPage2';


const MobileChatPage = (props) => {
    return(
        <>
            <BaseChatPage2 id={props.match.params.id}/>
        </>
        );
}

export default MobileChatPage;
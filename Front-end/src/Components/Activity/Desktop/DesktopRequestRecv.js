import React from "react";
import RequestRecv from '../RequestRecv';
import BasePopup from '../../Global/BasePopup';

const DesktopRequestRecv = (props) => {
    alert('req recv')
    return(
        <BasePopup>
            <RequestRecv/>
        </BasePopup>
        );
}

export default DesktopRequestRecv;
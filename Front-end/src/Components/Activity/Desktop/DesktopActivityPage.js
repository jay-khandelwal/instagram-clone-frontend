import React from "react";
import ActivityPage from '../ActivityPage';
import BasePopup from '../../Global/BasePopup';

const DesktopActivityPage = (props) => {
    return(
        <BasePopup isModal={props.isActivity}>
            <ActivityPage/>
        </BasePopup>
        );
}

export default DesktopActivityPage;
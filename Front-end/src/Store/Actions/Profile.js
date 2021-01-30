import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { HOST_URL } from "../../Settings";


export const remove_pic_loading = loading => {
    return{
        type: ActionTypes.Remove_Pic_Loading,
        loading
    }
}

export const uploadedImage = (imageFile) => {
    return{
        type:ActionTypes.UploadImage,
        imageFile
    }
}

export const removeProfilePic = (username, alertFunc, token) => {
    return dispatch => {
        dispatch(remove_pic_loading(true))
        axios.put(`${HOST_URL}/accounts/profile/edit/`,{profile_pic:null, username:username}, {
            headers:{
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => {
            dispatch(remove_pic_loading(false))
            alertFunc('success', 'Profile Picture Removed Successfully.')
        })
        .catch(error => {
            dispatch(remove_pic_loading(false))
            alertFunc('error', 'An Error Occur.')
        })        
    }
}
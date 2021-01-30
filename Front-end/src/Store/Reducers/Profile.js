import * as ActionTypes from "../Actions/ActionTypes";
import { updateObject } from "../Utility";

const initialState = {
  loading: false,
  uploadedImageFile:null,
};


const remove_pic_loading = (state, action) => {
  return updateObject(state, {
    loading:action.loading
  });
};

const uploadedImage = (state, action) => {
    return updateObject(state,{
        uploadedImageFile:action.imageFile
    })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    // remove profile pic
    case ActionTypes.Remove_Pic_Loading:
        return remove_pic_loading(state,action)
   
    case ActionTypes.UploadImage:
        return uploadedImage(state,action)
      
    default:
      return state;
  }
};

export default reducer;
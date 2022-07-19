export const SET_ADD_RECENT = "setAddRecent";
export const SET_CLEAR_RECENT = "setClearRecent";
export const SET_IMAGE_MODAL = "setImageModal";
export const SET_IMAGE_ID = "setImageData";
export const SET_VALUE = "setValue";

export const setAddRecent = (payload) => {
  return {
    type: SET_ADD_RECENT,
    payload,
  };
};

export const setClearRecent = () => {
  return {
    type: SET_CLEAR_RECENT,
  };
};

export const setImageModal = (payload) => {
  return {
    type: SET_IMAGE_MODAL,
    payload,
  };
};

export const setImageId = (payload) => {
  return {
    type: SET_IMAGE_ID,
    payload,
  };
};

export const setValue = (payload) => {
  return {
    type: SET_VALUE,
    payload,
  };
};

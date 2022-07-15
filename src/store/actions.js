export const SET_ADD_RECENT = "setAddRecent";
export const SET_CLEAR_RECENT = "setClearRecent";
export const SET_SEARCH_MODAL = "setSearchModal";
export const SET_IMAGE_MODAL = "setImageModal";
export const SET_IMAGE_ID = "setImageData";
export const SET_ORIENTATION = "setOrientation";
export const SET_DROPDOWN = "setDropdown";

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

export const setSearchModal = (payload) => {
  return {
    type: SET_SEARCH_MODAL,
    payload,
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

export const setOrientation = (payload) => {
  return {
    type: SET_ORIENTATION,
    payload,
  };
};

export const setDropdown = (payload) => {
  return {
    type: SET_DROPDOWN,
    payload,
  };
};

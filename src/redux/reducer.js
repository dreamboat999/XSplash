import {
  SET_ADD_RECENT,
  SET_CLEAR_RECENT,
  SET_IMAGE_MODAL,
  SET_IMAGE_ID,
} from "./actions";

const recentFromLocalStorage = JSON.parse(
  localStorage.getItem("recent") || "[]"
);

const initialState = {
  recentArr: recentFromLocalStorage,
  isImageModal: false,
  imageId: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADD_RECENT:
      return {
        ...state,
        recentArr: [...state.recentArr, action.payload],
      };
    case SET_CLEAR_RECENT:
      return {
        ...state,
        recentArr: [],
      };
    case SET_IMAGE_MODAL:
      return {
        ...state,
        isImageModal: action.payload,
      };
    case SET_IMAGE_ID:
      return {
        ...state,
        imageId: action.payload,
      };
    default:
      return state;
  }
};

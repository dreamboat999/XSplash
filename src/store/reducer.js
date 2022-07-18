import {
  SET_ADD_RECENT,
  SET_CLEAR_RECENT,
  SET_FORM_PANEL,
  SET_IMAGE_MODAL,
  SET_IMAGE_ID,
  SET_VALUE,
  SET_ORIENTATION,
  SET_SORT,
} from "./actions";

const recentFromLocalStorage = JSON.parse(
  localStorage.getItem("search") || "[]"
);

const initialState = {
  recentArr: recentFromLocalStorage,
  isFormPanel: false,
  isImageModal: false,
  imageId: null,
  value: "",
  orientation: "",
  sort: "relevant",
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
    case SET_FORM_PANEL:
      return {
        ...state,
        isFormPanel: action.payload,
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
    case SET_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    case SET_ORIENTATION:
      return {
        ...state,
        orientation: action.payload,
      };
    case SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    default:
      return state;
  }
};

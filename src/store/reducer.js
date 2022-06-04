import {
  SET_ADD_RECENT,
  SET_CLEAR_RECENT,
  SET_SEARCH_MODAL,
  SET_IMAGE_MODAL,
} from "./actions";

const recentFromLocalStorage = JSON.parse(
  localStorage.getItem("search") || "[]"
);

const newArr = [...new Set(recentFromLocalStorage)];

const initialState = {
  recentArr: newArr,
  isModalSearchOpen: false,
  imageModal: { isOpen: false, id: null },
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
    case SET_SEARCH_MODAL:
      return {
        ...state,
        isModalSearchOpen: action.payload,
      };
    case SET_IMAGE_MODAL:
      return {
        ...state,
        imageModal: action.payload,
      };
    default:
      return state;
  }
};

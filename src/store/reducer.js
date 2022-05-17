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
    case "ADD_RECENT":
      return {
        ...state,
        recentArr: [...state.recentArr, action.payload],
      };
    case "CLEAR_RECENT":
      return {
        ...state,
        recentArr: [],
      };
    case "DISPLAY_MODAL_SEARCH":
      return {
        ...state,
        isModalSearchOpen: action.payload,
      };
    case "DISPLAY_MODAL_IMAGE":
      return {
        ...state,
        imageModal: action.payload,
      };
    default:
      return state;
  }
};

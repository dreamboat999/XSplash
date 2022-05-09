const recentFromLocalStorage = JSON.parse(
  localStorage.getItem("search") || "[]"
);

const initialState = {
  recentArr: recentFromLocalStorage,
  isModalSearchOpen: false,
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
    default:
      return state;
  }
};

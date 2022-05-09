const recentFromLocalStorage = JSON.parse(
  localStorage.getItem("search") || "[]"
);

const initialState = {
  recentArr: recentFromLocalStorage,
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
    default:
      return state;
  }
};

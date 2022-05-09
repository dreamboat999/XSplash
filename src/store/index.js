import { combineReducers, createStore } from "redux";
import { appReducer } from "./reducer";

const rootReducer = combineReducers({
  appState: appReducer,
});

export const store = createStore(rootReducer);

import { combineReducers, createStore } from "redux";
import { appReducer } from "./reducers";

const rootReducer = combineReducers({
  appState: appReducer,
});

export const store = createStore(rootReducer);

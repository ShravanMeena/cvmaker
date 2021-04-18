import { createStore, combineReducers } from "redux";
import resumeReducer from "./reducer/resumeReducer";

import { LOG_OUT } from "../redux/action/types";

import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["resumeReducer"],
};

const rootReducer = combineReducers({
  resumeReducer,
});

const logoutReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, logoutReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

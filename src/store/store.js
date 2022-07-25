import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import mainRedux from "../ducks/mainRedux";

const rootReducer = combineReducers({
  mainRedux,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});

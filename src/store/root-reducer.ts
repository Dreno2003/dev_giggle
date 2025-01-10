import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {persistedAuthReducer} from "./slice/auth-slice";

// Combine reducers
const rootReducer = combineReducers({
  //   reducers here
  auth: persistedAuthReducer,
});

// Configure store with rootReducer
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

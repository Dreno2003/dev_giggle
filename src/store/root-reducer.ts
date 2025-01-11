import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {persistedAuthReducer} from "./slice/auth-slice";
import { persistStore } from "redux-persist";

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


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

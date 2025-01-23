// import { User } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Error } from "@/types/error.types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserModel } from "@/models/user.model";
// import { UserCredential  } from "firebase/auth";

interface UserState {
  status: "success" | "loading" | "failed" | "idle";
  user: UserModel | undefined;
  error: Error;
  isLoaded: boolean;
}

const initValue: UserState = {
  status: "idle",
  error: { message: "", code: 0 },
  isLoaded: false,
  user: undefined,
};

// import { User, OperationType, ProviderId  } from "firebase/auth";

//

const userSlice = createSlice({
  name: "user-slice",
  initialState: initValue,
  reducers: {
    // resetAuthSlice: (state) => {
    //   state.error.message = "";
    //   state.status = {
    //     state: "idle",
    //   };
    // },

    setUserData: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
  },
});

const userPersistConfig = {
  key: "user",
  storage,
  // blacklist: ["isUser", "error", "status", "isLoaded"],
};

export const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;

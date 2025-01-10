// import { User } from "@/models/user.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Error } from "@/types/error.types";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { User } from "firebase/auth";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { UserCredential  } from "firebase/auth";

interface AuthState {
  status: {
    state: "success" | "loading" | "failed" | "idle";
    type?: "google" | "signout";
  };
  user: User | undefined;
  error: Error;
  isLoaded: boolean;
  isUser: boolean;
}

const initValue: AuthState = {
  status: { state: "idle" },
  error: { message: "", code: 0 },
  isLoaded: false,
  isUser: false,
  user: undefined,
};

// import { User, OperationType, ProviderId  } from "firebase/auth";

export const googleSignIn = createAsyncThunk<
  User,
  void,
  { rejectValue: Error }
>("auth/googleSignUp", async (_, { rejectWithValue }) => {
  try {
    const res = await AuthService.googleSingIn();
    await UserService.createUser(res.user);
    return res.user;
  } catch (error) {
    const res = rejectWithValue(error as Error);
    return res;
  }
});

export const signOutuser = createAsyncThunk("auth/signout", async () => {
  await AuthService.signout();
});

//

const authSlice = createSlice({
  name: "auth-slice",
  initialState: initValue,
  reducers: {
    resetAuthSlice: (state) => {
      state.error.message = "";
      state.status = {
        state: "idle",
      };
    },

    resetAuthError: (state) => {
      state.error.message = "";
    },
    resetAuthSuccess: (state) => {
      state.status = {
        state: "idle",
      };
    },
    setUser: (state, action) => {
      state.isUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(googleSignIn.pending, (state) => {
        // | "googleSignin-loading"
        // | "googleSignin-success"
        state.status = {
          state: "loading",
          type: "google",
        };
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.status = {
          state: "success",
          type: "google",
        };
        state.user = action.payload;
        // state.lastFetched = new Date();
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.status = {
          state: "failed",
          type: "google",
        };
        state.error!.message = action.payload?.message ?? "Unknown Error";
      })

      .addCase(signOutuser.pending, (state) => {
        state.status = {
          state: "loading",
          type: "signout",
        };
      })
      .addCase(signOutuser.fulfilled, (state) => {
        state.status = { state: "success", type: "signout" };
        state.error.message = "";
      })
      .addCase(signOutuser.rejected, (state) => {
        state.status = { state: "failed", type: "signout" };
      });
  },
});

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["isUser", "error", "status", "isLoaded"],
};

export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export const { resetAuthSlice, setUser, resetAuthSuccess, resetAuthError } =
  authSlice.actions;

export default authSlice.reducer;

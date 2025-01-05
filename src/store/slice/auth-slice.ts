// import { User } from "@/models/user.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Error } from "@/types/error.types";
import { AuthService } from "@/services/auth.service";

interface AuthState {
  lastFetched?: Date;
  status: {
    state: "success" | "loading" | "failed" | "idle";
    type?: "google" | "signout";
  };
  error: Error;
  isLoaded: boolean;
}

const initValue: AuthState = {
  status: { state: "idle" },
  error: { message: "", code: 0 },
  isLoaded: false,
};

export const googleSignIn = createAsyncThunk<
  void,
  string,
  { rejectValue: Error }
>("auth/googleSignUp", async (_, { rejectWithValue }) => {
  try {
    await AuthService.googleSingIn();
  } catch (error) {
    return rejectWithValue(error as Error);
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
      .addCase(googleSignIn.fulfilled, (state, _action) => {
        state.status = {
          state: "success",
          type: "google",
        };
        state.lastFetched = new Date();
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
        state.lastFetched = undefined;
        state.error.message = "";
      })
      .addCase(signOutuser.rejected, (state) => {
        state.status = { state: "failed", type: "signout" };
      });
  },
});

// const authPersistConfig = {
//   key: "auth",
//   storage,
// };

// export const persistedAuthReducer = persistReducer(
//   authPersistConfig,
//   authSlice.reducer
// );

export const { resetAuthSlice, resetAuthSuccess, resetAuthError } =
  authSlice.actions;

export default authSlice.reducer;

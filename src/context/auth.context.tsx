import { User } from "@supabase/supabase-js";
import * as React from "react";
import { supabase } from "../config/firebase.config";

// user will sign in
// sign out
// sign up

interface AuthContextProps {
  user: User | undefined;
  loading: boolean;
  isLoggedOut: boolean;
  isSignedIn: boolean;
  isSignedUp: boolean;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signUp: ({
    email,
    password,
    username,
  }: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isLoggedOut, setIsLoggedOut] = React.useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = React.useState<boolean>(false);

  React.useEffect(() => {
    // check if user is logged in (if there is previous session)
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? undefined);
      setLoading(false);
    });

    // listen for auth state changes

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? undefined);
      setLoading(false);
    });

    return () => subscription.unsubscribe();

    // const user = localStorage.getItem("user");
    // if (user) {
    //     setUser(JSON.parse(user));
    // }
    // setLoading(false);
  }, []);

  //   work on signin and sign up and out funtion

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSignedIn(true);
    if (error) {
      throw error;
    }
  }

  async function signUp({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) {
    {
      username;
    }
    const {
      error,
      data: { user },
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    }

    // create username

    if (user) {
      const { error } = await supabase.from("profiles").insert([
        {
          user_id: user.id,
          username: email.split("@")[0],
          updated_at: new Date(),
          // username: email.split('@')[0]
        },
      ]);

      setIsSignedUp(true);
      if (error) {
        throw error;
      }
    }
  }

  // async function signOut() {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) {
  //     throw error;
  //     }
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setIsLoggedOut(true);
    if (error) {
      throw error;
    }
    setUser(undefined);
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isLoggedOut,
    isSignedIn,
    isSignedUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export const  useAuth () : AuthContextProps => {}
export const useAuth = (): AuthContextProps => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

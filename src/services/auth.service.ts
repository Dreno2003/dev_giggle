import { auth } from "@/config/firebase.config";
import { Error } from "@/types/error.types";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();

export class AuthService {
  static async googleSingIn() {
    try {
      return await signInWithPopup(auth, provider);
    } catch (error: any) {
      throw { message: error.response.data.message, code: 501 } as Error;
    }
  }

  static async signout() {
    try {
      return await auth.signOut();
    } catch (error: any) {
      throw { message: error.message, code: 501 } as Error;
    }
  }

  static async isSingedIn() {
    return auth.currentUser != null;
  }
}

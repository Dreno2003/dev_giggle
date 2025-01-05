import { auth } from "@/config/firebase.config";
import { User } from "firebase/auth";

export class FirebaseHelper {
  static async getAuthToken() {
    return new Promise<string | undefined>((resolve, reject) => {
      const done = auth.onAuthStateChanged(async (user) => {
        done();
        let token = await user?.getIdToken();
        resolve(token);
      }, reject);
    });
  }

  static getuser() {
    return new Promise<User | undefined | null>((resolve, reject) => {
      const done = auth.onAuthStateChanged(async (user) => {
        done();

        resolve(user);
      }, reject);
    });
  }

  static checkEmailVerification(): Promise<boolean | undefined> {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser;
      if (user) {
        user
          .reload()
          .then(() => {

              
              resolve(user.emailVerified); // Email not verified, return null
            
          })
          .catch((error) => {
            reject(error); // Handle errors during reload
          });
      } else {
        resolve(undefined); // No user is signed in
      }
    });
  }
}

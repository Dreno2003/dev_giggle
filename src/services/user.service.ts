import { firestore } from "@/config/firebase.config";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export class UserService {
  static async createUser(user: User) {
    try {
      // collection name users
      const userRef = doc(firestore, "users", user.uid);

      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Anonymous",
          photoURL: user.photoURL || null,
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );

      console.log("User data stored in Firestore");
    } catch (error) {
      throw "Error storing user data";
    }
  }
}

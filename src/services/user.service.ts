import { db } from "@/config/firebase.config";
import { UserModel } from "@/models/user.model";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export class UserService {
  static async createUser(user: UserModel) {
    try {
      // collection name users
      const userRef = doc(db, "users", user.uid!);

      const data: UserModel = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        photoURL: user.photoURL || null,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        isAcceptUserAgreeMent: false,
      };
      await setDoc(userRef, data, { merge: true });
    } catch (error) {
      throw "Error storing user data";
    }
  }

  static async updateUserAgreement(uid: string) {
    try {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, {
        isAcceptUserAgreeMent: true,
      });
    } catch (error: any) {
      throw new Error(`user agreement error, ${error}`);
    }
  }

  static async getUser(uid: string) {
    try {
      const docRef = doc(db, "users", uid);
      console.log("this is called get user service top");
      const res = await getDoc(docRef);
      if (res.exists()) {
        const data = res.data();
        console.log("this is called data main", data);
        return data;
      } else {
        throw new Error("No such document");
      }
    } catch (error: any) {
      throw new Error(`get user error, ${error}`);
    }
  }
}

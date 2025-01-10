import { firestore } from "@/config/firebase.config";
import { Meme } from "@/models/meme.model";
import { User } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

export class MemeService {
  static async uploadMeme(meme: Meme, user: User) {
    try {
      // collection name users
      const memeRef = doc(collection(firestore, "memes"));

      await setDoc(
        memeRef,
        {
          id: '''''  // Use the generated document ID as the meme ID
          title: meme.title,
          imageUrl: meme.imageUrl,
          description: meme.description || "",
          attribution: meme.attribution,
          uploadedBy: {
            userId: user.uid,
            username: user.displayName || "Anonymous",
            profileImage: user.photoURL || null,
          },
          flags: {
            count: 0,
            reasons: [],
            reportedBy: [],
          },
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: "active",
          },
          tags: meme.tags || [],
          disputed: false,
          views: 0,
          likes: 0,
          comments: 0,
        },
        { merge: true }
      );

      console.log("mem data stored in Firestore");
    } catch (error) {
      throw "Error storing user data";
    }
  }
}

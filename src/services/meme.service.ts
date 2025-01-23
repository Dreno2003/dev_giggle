import { db } from "@/config/firebase.config";
import { Meme } from "@/models/meme.model";
import { User } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

interface UploadMemeProps {
  meme: Meme;
  user: User;
}

export class MemeService {
  static async uploadMeme({ meme, user }: UploadMemeProps) {
    try {
      // collection name users
      const memeRef = doc(collection(db, "memes"));

      await setDoc(
        memeRef,
        {
          id: meme.id, // Use the generated document ID as the meme ID
          title: meme.title,
          imageUrls: meme.imageUrls,
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
    } catch (error) {
      throw "Error storing user data";
    }
  }
}

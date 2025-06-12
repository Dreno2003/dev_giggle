import { db } from "@/config/firebase.config";

import { Meme } from "@/models/meme.model";
import { User } from "firebase/auth";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import {
  QueryDocumentSnapshot,
  DocumentData,
  updateDoc,
} from "firebase/firestore";

import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  startAfter,
  limit,
  orderBy,
  setDoc,
} from "firebase/firestore";

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
          id: memeRef.id, // Use the generated document ID as the meme ID
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
          likes: [],
          likeCount: 0,
          comments: 0,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error, "this is called erro");
      throw "Error storing user data";
    }
  }

  static async like(id: string, uid:string) {
    // console.log(id, newLikesValue, "this is called service top");
    try {
      const docRef = doc(db, "memes", id);
      const memeSnap = await getDoc(docRef);

      if (memeSnap.exists()) {
        const memeData = memeSnap.data();
        const isLiked = memeData.likes.includes(id);

        await updateDoc(docRef, {
          likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
          likeCount: isLiked ? memeData.likeCount - 1 : memeData.likeCount + 1,
        });
      }
      // await updateDoc(docRef, {
      //   likes: newLikesValue,
      // });
    } catch (error) {
      console.log(error, "this is called like error");
    }
  }

  static async get({
    pageParam,
  }: {
    pageParam?: QueryDocumentSnapshot<DocumentData>;
  }) {
    const pageSize = 8;
    // TODOset page size to 100 on prod
    // const pageSize = 100;
    const collectionRef = collection(db, "memes");
    let q;

    if (pageParam) {
      // If pageParam exists, use it as the starting point
      q = query(
        collectionRef,
        orderBy("metadata.createdAt"),
        startAfter(pageParam),
        limit(pageSize)
      );
    } else {
      // Fetch the first page
      q = query(collectionRef, orderBy("metadata.createdAt"), limit(pageSize));
    }

    const snapshot = await getDocs(q);

    // Get the last document to use as the cursor for the next page
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    // Map Firestore documents to a usable format
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const firstVisible = snapshot.docs[0];
    const mainData = {
      data,
      ref: collectionRef.parent?.id,
    };

    console.log("this is called ", mainData);
    return {
      data,
      lastVisible,
      firstVisible,
      hasMore: data.length === pageSize, // Check if there are more documents to load
    };
  }

  // static async get() {
  //   try {
  //     const initDocRef = query(
  //       collection(db, "memes"),
  //       orderBy("createdAt"),
  //       limit(100)
  //     );
  //     const snapshot = await getDocs(initDocRef);
  //     const lastVisible = snapshot.docs[snapshot.docs.length - 1]
  //     // get last visible doc
  //   } catch (error) {
  //     throw new Error(`get user error, ${error}`);
  //   }
  // }
}

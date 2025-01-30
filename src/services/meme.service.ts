import { db } from "@/config/firebase.config";

import { Meme } from "@/models/meme.model";
import { User } from "firebase/auth";
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

import {
  collection,
  doc,
  getDocs,
  query,
  startAfter,
  limit,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { AnyObject } from "yup";

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

  static async get({ pageParam  }: {pageParam:any}) {
    // static async get({ pageParam  }: {pageParam:QueryDocumentSnapshot<DocumentData, DocumentData>}) {
    const pageSize = 100;
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
      console.log('this is called pageParam', pageParam,q)
    } else {
      // Fetch the first page
      q = query(collectionRef, orderBy("metadata.createdAt"), limit(pageSize));
      console.log('this is called pageParam first page',pageParam,q)
    }

    const snapshot = await getDocs(q);

    // Get the last document to use as the cursor for the next page
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    // Map Firestore documents to a usable format
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log('this is called service data', data)
    const firstVisible = snapshot.docs[0];
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

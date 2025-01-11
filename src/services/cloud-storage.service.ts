import { storage } from "@/config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class CloudStorageService {
  static async store({
    storagePath,
    file,
  }: {
    storagePath: string;
    file: File;
  }) {
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);

   
    const url = await getDownloadURL(storageRef);
    return url;
  }

  static async delete() {}
}

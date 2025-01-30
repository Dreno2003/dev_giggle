import imageCompression from "browser-image-compression";
export class FileUtils {
  static absoluteUrl(path: string) {
    return `${import.meta.env.VITE_APP_IMAGE_PATH}${path}`;
    // return `${process.env.REACT_APP_IMAGE_PATH}${path}`;
  }

  static async compressImage(
    file: File,
    targetSizeKB: number,
    maxWidthOrHeight?: number
  ): Promise<File | null> {
    const maxSizeMB = targetSizeKB / 1024;
    const options = {
      // maxSizeMB
      maxSizeMB: maxSizeMB, // Maximum size in MB
      // maxSizeMB:5, // Maximum size in MB
      maxWidthOrHeight: maxWidthOrHeight ?? 1920, // Maximum width or height
      useWebWorker: true, // Use a web worker for faster compression
    };

    try {
      const compressedFile = await imageCompression(file, options);

      return compressedFile;
    } catch (error) {
      return null;
    }
  }
}

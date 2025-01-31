import imageCompression from "browser-image-compression";
import JSZip from "jszip";
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


  static async downloadImage(url: string, title: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}_meme_lane.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to download image:", err);
    }
  }

  static async downloadImagesAsZip(urls: string[], zipFileName: string) {
    const zip = new JSZip();

    try {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch image ${url}: ${response.statusText}`
          );
        }

        const blob = await response.blob();
        const fileName = `image${i + 1}.png`;
        zip.file(fileName, blob, { binary: true });
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `${zipFileName}_meme_lane.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Failed to download images and create ZIP:", err);
    }
  }

}

export class FileUtils {
  static absoluteUrl(path: string) {
    return `${import.meta.env.VITE_APP_IMAGE_PATH}${path}`;
    // return `${process.env.REACT_APP_IMAGE_PATH}${path}`;
  }
}

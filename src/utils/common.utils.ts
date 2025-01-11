export class CommonUtils {
  static getNameInitial(sentence: string) {
    if (!sentence) return;
    // Trim any extra spaces at the start and end
    // if (!sentence) return;
    sentence = sentence.trim()!;

    // Split the sentence into words
    const words = sentence.split(" ");

    // Get the first letter of the first word
    const firstLetter = words[0][0];
    let lastLetter = "";
    if (words.length > 1) {
      // Get the first letter of the last word
      lastLetter = words[words.length - 1][0];
    }
    return `${firstLetter}${lastLetter}`;
  }


  static generateId() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 16; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}

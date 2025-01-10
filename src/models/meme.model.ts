export interface Meme {
  id: string; // Unique identifier for the meme
  title: string; // Title or caption of the meme
  imageUrl: string; // URL of the uploaded meme image
  description?: string; // Optional description of the meme
  attribution: {
    originalCreator: string; // Name of the meme's original creator
    license: string; // License type (e.g., "CC-BY 4.0")
    source?: string; // Optional link to the original source
  };
  uploadedBy: {
    userId: string; // Uploader's unique Firebase ID
    username: string; // Uploader's display name
    profileImage: string; // URL to uploader's profile picture
  };
  flags: {
    count: number; // Total number of flags
    reasons: string[]; // Reasons for flags (e.g., "Stolen content")
    reportedBy: string[]; // List of user IDs who flagged the meme
  };
  metadata: {
    createdAt: string; // ISO timestamp for creation date
    updatedAt: string; // ISO timestamp for the last update
    status: "active" | "under_review" | "removed"; // Status of the meme
  };
  tags: string[]; // List of tags for categorization (e.g., ["funny", "cat"])
  disputed: boolean; // Indicates if the meme is under dispute
  views: number; // Total views of the meme
  likes: number; // Total likes on the meme
  comments: number; // Total comments on the meme
}

// interface MemeCollection {
//   [key: string]: Meme; // A collection of memes indexed by their IDs
// }

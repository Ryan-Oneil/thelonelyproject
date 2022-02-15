export interface BaseProfile {
  name: string;
  avatar?: File;
  about: string;
}

export interface UserProfile extends BaseProfile {
  userId: string;
  profilePictureUrl: string;
  images: Array<any>;
  interests: Array<any>;
  prompts: Array<any>;
  spotifyArtists: Array<any>;
}

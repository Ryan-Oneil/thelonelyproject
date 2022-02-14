export interface BaseProfile {
  name: string;
  avatar: string | File;
  about: string;
}

export interface UserProfile extends BaseProfile {
  avatar: string;
  images: Array<any>;
  interests: Array<any>;
  prompts: Array<any>;
  spotifyArtists: Array<any>;
}

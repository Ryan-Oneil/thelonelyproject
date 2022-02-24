export interface BaseProfile {
  name: string;
  avatar?: File;
  about: string;
}

export interface UserProfile extends BaseProfile {
  userId: string;
  profilePictureUrl: string;
  medias: Array<any>;
  interests: Array<any>;
  prompts: Array<any>;
  spotifyArtists: Array<any>;
}

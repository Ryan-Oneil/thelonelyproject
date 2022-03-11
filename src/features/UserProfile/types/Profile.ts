export interface BaseProfile {
  name?: string;
  avatar?: File;
  about?: string;
}

export interface UserProfile extends BaseProfile {
  id?: string;
  profilePictureUrl?: string;
  medias?: Array<any>;
  interests?: Array<any>;
  prompts?: Array<any>;
  spotifyArtists?: Array<any>;
}

export type Prompt = {
  promptId: number;
  promptName: string;
  text: string;
};

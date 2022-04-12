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
  spotifyArtists?: Array<ProfileTrait>;
}

export type Prompt = {
  promptId: number;
  promptName: string;
  text: string;
};

export type ProfileTrait = {
  id: number;
  name: string;
  icon: string;
};

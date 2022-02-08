import { createSlice } from "@reduxjs/toolkit";

type UserProfileState = {
  name: string;
  avatar: string;
  about: string;
  images: Array<any>;
  interests: Array<any>;
  prompts: Array<any>;
  spotifyArtists: Array<any>;
};

const initialState: UserProfileState = {
  name: "",
  avatar:
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'",
  about: "Hey I'm a cool person doing cool things",
  images: [
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
  ],
  interests: [
    { icon: "user", description: "Walking" },
    { icon: "user", description: "Walking" },
    { icon: "user", description: "Walking" },
    { icon: "user", description: "Walking" },
    { icon: "user", description: "Walking" },
    { icon: "user", description: "Walking" },
  ],
  prompts: [
    {
      title: "Interesting fact about me",
      description: "I built this project!",
    },
    {
      title: "A me day is",
      description: "Chilling on the couch with Netflix",
    },
  ],
  spotifyArtists: [
    { iconUrl: "user", name: "Artist Name" },
    { iconUrl: "user", name: "Artist Name" },
    { iconUrl: "user", name: "Artist Name" },
    { iconUrl: "user", name: "Artist Name" },
    { iconUrl: "user", name: "Artist Name" },
    { iconUrl: "user", name: "Artist Name" },
  ],
};

export const slice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {
    profileCompleted(state, action) {
      state.name = action.payload.name;
      state.about = action.payload.about;
      state.avatar = action.payload.avatar;
    },
  },
});
export default slice.reducer;
export const { profileCompleted } = slice.actions;

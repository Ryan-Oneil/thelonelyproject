import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "userProfile",
  initialState: {
    avatar:
      "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'",
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
    aboutMe: "Hey I'm a cool person doing cool things",
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
  },
  reducers: {},
});
export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { apiGetCall, apiPostCall } from "../apis/api";
import {
  USER_PROFILE_CREATE_ENDPOINT,
  USER_PROFILE_INFO_ENDPOINT,
  USER_PROFILE_UPLOAD_PICTURE_ENDPOINT,
} from "../apis/endpoints";
import { BaseProfile, UserProfile } from "./types/Profile";
import { AppDispatch } from "../index";

const initialState: UserProfile = {
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
    },
    profilePictureChanged(state, action) {
      state.avatar = action.payload;
    },
    fetchedProfile(state, action) {
      state.avatar = action.payload.avatar;
      state.name = action.payload.name;
      state.about = action.payload.about;
    },
  },
});
export default slice.reducer;
export const { profileCompleted, profilePictureChanged, fetchedProfile } =
  slice.actions;

export const createUserProfile =
  (profile: BaseProfile) => (dispatch: AppDispatch) => {
    return apiPostCall(USER_PROFILE_CREATE_ENDPOINT, profile).then(() => {
      if (profile.avatar) {
        dispatch(uploadProfilePicture(profile.avatar as File));
      }
      dispatch(profileCompleted(profile));
    });
  };

export const uploadProfilePicture =
  (picture: File) => (dispatch: AppDispatch) => {
    let postData = new FormData();
    postData.append("file", picture, picture.name);

    return apiPostCall(USER_PROFILE_UPLOAD_PICTURE_ENDPOINT, postData).then(
      (response) => dispatch(profilePictureChanged(response.data))
    );
  };

export const fetchUserProfile =
  (userId = "") =>
  (dispatch: AppDispatch) => {
    return apiGetCall(`${USER_PROFILE_INFO_ENDPOINT}/${userId}`).then(
      (response) => {
        return dispatch(fetchedProfile(response.data));
      }
    );
  };

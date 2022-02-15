import { createSlice } from "@reduxjs/toolkit";
import { apiGetCall, apiPostCall, apiPutCall } from "../apis/api";
import {
  USER_PROFILE_CREATE_ENDPOINT,
  USER_PROFILE_INFO_ENDPOINT,
  USER_PROFILE_UPDATE_ABOUT_ENDPOINT,
  USER_PROFILE_UPLOAD_PICTURE_ENDPOINT,
} from "../apis/endpoints";
import { BaseProfile, UserProfile } from "./types/Profile";
import { AppDispatch } from "../index";
import { NormalizedObjects } from "../utils/NormalizedObjects";

type UserProfileState = {
  users: NormalizedObjects<UserProfile>;
};

const initialState: UserProfileState = {
  users: {
    ids: ["1"],
    entities: {
      "1": {
        userId: "1",
        name: "",
        profilePictureUrl:
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
      },
    },
  },
};

export const slice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {
    profilePictureChanged(state, action) {
      state.users.entities[action.payload.id].profilePictureUrl =
        action.payload.url;
    },
    fetchedProfile(state, action) {
      const id = action.payload.userId;

      const user = {
        ...state.users.entities[id],
        ...action.payload,
        images: [],
        interests: [],
        prompts: [],
        spotifyArtists: [],
      };
      state.users.entities = Object.assign({}, state.users.entities, {
        [id]: user,
      });
    },
    profileUpdate(state, action) {
      state.users.entities[action.payload.id] = {
        ...state.users.entities[action.payload.id],
        ...action.payload.updates,
      };
    },
  },
});
export default slice.reducer;
export const { profilePictureChanged, fetchedProfile, profileUpdate } =
  slice.actions;

export const createUserProfile =
  (profile: BaseProfile, userId: string) => (dispatch: AppDispatch) => {
    return apiPostCall(USER_PROFILE_CREATE_ENDPOINT, profile).then(() => {
      if (profile.avatar) {
        dispatch(uploadProfilePicture(profile.avatar, userId));
      }
    });
  };

export const uploadProfilePicture =
  (picture: File, userId: string) => (dispatch: AppDispatch) => {
    let postData = new FormData();
    postData.append("file", picture, picture.name);

    return apiPostCall(USER_PROFILE_UPLOAD_PICTURE_ENDPOINT, postData).then(
      (response) =>
        dispatch(profilePictureChanged({ id: userId, url: response.data }))
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

export const updateProfileAbout =
  (userId: string, about: string) => (dispatch: AppDispatch) => {
    return apiPutCall(USER_PROFILE_UPDATE_ABOUT_ENDPOINT, { about }).then(() =>
      dispatch(profileUpdate({ id: userId, changes: { about } }))
    );
  };

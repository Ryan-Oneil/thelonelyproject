import { createSlice } from "@reduxjs/toolkit";
import {
  apiDeleteCall,
  apiGetCall,
  apiPostCall,
  apiPutCall,
} from "../apis/api";
import {
  USER_PROFILE_CREATE_ENDPOINT,
  USER_PROFILE_INFO_ENDPOINT,
  USER_PROFILE_INTERESTS_ENDPOINT,
  USER_PROFILE_MEDIA_DELETE_ENDPOINT,
  USER_PROFILE_MEDIA_UPLOAD_ENDPOINT,
  USER_PROFILE_UPDATE_ABOUT_ENDPOINT,
  USER_PROFILE_UPLOAD_PICTURE_ENDPOINT,
} from "../apis/endpoints";
import { BaseProfile, UserProfile } from "./types/Profile";
import { AppDispatch } from "../index";
import { NormalizedObjects } from "../utils/NormalizedObjects";
import { CategoryInterest, Interest } from "./types/Interest";
import { normalize, schema } from "normalizr";

type UserProfileState = {
  users: NormalizedObjects<UserProfile>;
  interestCategories: NormalizedObjects<CategoryInterest>;
  interests: NormalizedObjects<Interest>;
};

const initialState: UserProfileState = {
  users: {
    ids: [],
    entities: {},
  },
  interestCategories: {
    ids: [],
    entities: {},
  },
  interests: {
    ids: [],
    entities: {},
  },
};

const interest = new schema.Entity("interests");
const interestCategory = new schema.Entity("categories", {
  interests: [interest],
});
const categoryList = new schema.Array(interestCategory);

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
        interests: [
          { id: 1, description: "Foot Ball" },
          { id: 2, description: "Games" },
          { id: 3, description: "Study" },
        ],
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
    profileMediaDeleted(state, action) {
      const { userId, mediaId } = action.payload;

      state.users.entities[userId].medias = state.users.entities[
        userId
      ].medias.filter((media) => media.id !== mediaId);
    },
    profileMediaUploaded(state, action) {
      const { userId, medias } = action.payload;

      state.users.entities[userId].medias =
        state.users.entities[userId].medias.concat(medias);
    },
    fetchedInterests(state, action) {
      const data = normalize(action.payload, categoryList);
      const categories = {
        ids: [...data.result],
        entities: data.entities.categories,
      };

      state.interestCategories =
        categories as NormalizedObjects<CategoryInterest>;
      state.interests = {
        ids: [],
        entities: data.entities.interests,
      } as NormalizedObjects<Interest>;
    },
  },
});
export default slice.reducer;
export const {
  profilePictureChanged,
  fetchedProfile,
  profileUpdate,
  profileMediaDeleted,
  profileMediaUploaded,
  fetchedInterests,
} = slice.actions;

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

export const deleteProfileMedia =
  (mediaId: number, userId: string) => (dispatch: AppDispatch) => {
    return apiDeleteCall(
      `${USER_PROFILE_MEDIA_DELETE_ENDPOINT}/${mediaId}`
    ).then(() => dispatch(profileMediaDeleted({ mediaId, userId })));
  };

export const uploadProfileMedia =
  (media: File, userId: string) => (dispatch: AppDispatch) => {
    let postData = new FormData();
    postData.append("file", media, media.name);

    return apiPostCall(USER_PROFILE_MEDIA_UPLOAD_ENDPOINT, postData).then(
      (response) =>
        dispatch(profileMediaUploaded({ userId, medias: response.data }))
    );
  };

export const fetchInterestsByCategory = () => (dispatch: AppDispatch) => {
  return apiGetCall(USER_PROFILE_INTERESTS_ENDPOINT).then((response) =>
    dispatch(fetchedInterests(response.data))
  );
};

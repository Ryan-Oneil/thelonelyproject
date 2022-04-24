import { apiDeleteCall, apiPostCall, apiPutCall } from "../../../apis/api";
import {
  USER_PROFILE_ADD_INTEREST_ENDPOINT,
  USER_PROFILE_ADD_PROMPT_ENDPOINT,
  USER_PROFILE_CREATE_ENDPOINT,
  USER_PROFILE_DELETE_PROMPT_ENDPOINT,
  USER_PROFILE_MEDIA_DELETE_ENDPOINT,
  USER_PROFILE_MEDIA_UPLOAD_ENDPOINT,
  USER_PROFILE_REMOVE_INTEREST_ENDPOINT,
  USER_PROFILE_SEND_CONNECTION_REQUEST,
  USER_PROFILE_SYNC_SPOTIFY,
  USER_PROFILE_UPDATE_ABOUT_ENDPOINT,
  USER_PROFILE_UPLOAD_PICTURE_ENDPOINT,
} from "../../../apis/endpoints";
import { useMutation } from "react-query";
import { queryClient } from "../../../index";
import { BaseProfile, Prompt } from "../types/Profile";

const config = {
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries("userProfile");
  },
};

export const createUserProfile = (profile: BaseProfile) => {
  return apiPostCall(USER_PROFILE_CREATE_ENDPOINT, profile).then(() => {
    if (profile.avatar) {
      return uploadProfilePicture(profile.avatar);
    }
  });
};

export const uploadProfilePicture = (picture: File) => {
  let postData = new FormData();
  postData.append("file", picture, picture.name);

  return apiPostCall(USER_PROFILE_UPLOAD_PICTURE_ENDPOINT, postData).then(
    (response) => response.data
  );
};

export const useUploadProfilePicture = () => {
  return useMutation(uploadProfilePicture, config);
};

export const updateProfileAbout = (about: string) => {
  return apiPutCall(USER_PROFILE_UPDATE_ABOUT_ENDPOINT, { about }).then(
    () => about
  );
};

export const useUpdateProfileAbout = () => {
  return useMutation(updateProfileAbout, config);
};

export const uploadProfileMedia = (media: File) => {
  let postData = new FormData();
  postData.append("file", media, media.name);

  return apiPostCall(USER_PROFILE_MEDIA_UPLOAD_ENDPOINT, postData).then(
    (response) => response.data
  );
};

export const useUploadProfileMedia = () => {
  return useMutation(uploadProfileMedia, config);
};

export const deleteProfileMedia = (mediaId: number) => {
  return apiDeleteCall(`${USER_PROFILE_MEDIA_DELETE_ENDPOINT}/${mediaId}`);
};

export const useDeleteProfileMedia = () => {
  return useMutation(deleteProfileMedia, config);
};

export const addInterestToProfile = (interestId: number) => {
  return apiPostCall(USER_PROFILE_ADD_INTEREST_ENDPOINT, {
    id: interestId,
  });
};

export const useAddProfileInterest = () => {
  return useMutation(addInterestToProfile, config);
};

export const removeInterestFromProfile = (interestId: number) => {
  return apiDeleteCall(
    `${USER_PROFILE_REMOVE_INTEREST_ENDPOINT}/${interestId}`
  );
};

export const useDeleteProfileInterest = () => {
  return useMutation(removeInterestFromProfile, config);
};

export const addPromptToProfile = (prompt: Prompt) => {
  return apiPostCall(USER_PROFILE_ADD_PROMPT_ENDPOINT, prompt);
};

export const useAddPrompt = () => {
  return useMutation(addPromptToProfile, config);
};

export const deletePromptFromProfile = (promptId: number) => {
  return apiDeleteCall(`${USER_PROFILE_DELETE_PROMPT_ENDPOINT}/${promptId}`);
};

export const useDeletePrompt = () => {
  return useMutation(deletePromptFromProfile, config);
};

export const sendConnectRequest = (profileId: string) => {
  return apiPostCall(
    USER_PROFILE_SEND_CONNECTION_REQUEST.replace("%s", profileId)
  );
};

export const useSendConnectionRequest = () => {
  return useMutation(sendConnectRequest, config);
};

export const changeRequestStatus = ({
  profileId,
  status,
}: {
  profileId: string;
  status: string;
}) => {
  return apiPostCall(
    `${USER_PROFILE_SEND_CONNECTION_REQUEST.replace("%s", profileId)}/${status}`
  );
};

export const useChangeRequestStatus = () => {
  return useMutation(changeRequestStatus, config);
};
export const syncSpotifyTopListened = (authToken: string) => {
  return apiPutCall(`${USER_PROFILE_SYNC_SPOTIFY}/${authToken}`);
};

export const useSyncSpotify = () => {
  return useMutation(syncSpotifyTopListened, config);
};

import React from "react";
import {
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import AvatarTag from "./AvatarTag";
import { ProfileTrait } from "../types/Profile";
import { useSyncSpotify } from "../api/updateUserProfile";
import { FaSpotify } from "react-icons/fa";

type props = {
  artists: Array<ProfileTrait>;
  editMode: boolean;
};

const SpotifyArtists = ({ artists, editMode }: props) => {
  const spotify = useSyncSpotify();

  return (
    <ProfileCard
      header={
        <Flex>
          <Heading size={"md"} m={"auto"}>
            Trending Spotify Artists
          </Heading>
          <Spacer />
          {editMode && (
            <Tooltip label={"Sync Spotify"}>
              <IconButton
                size="sm"
                variant={"ghost"}
                icon={<FaSpotify color={"green"} size={28} />}
                aria-label={"Edit"}
                onClick={() => {
                  window.open(
                    `https://accounts.spotify.com/authorize?client_id=62b2508f08be428dbe4bea3c7e9057a0&scope=user-top-read&response_type=token&redirect_uri=${window.location.origin}/profile/spotify`,
                    "Spotify",
                    "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=450, height=730"
                  );
                  window.addEventListener(
                    "message",
                    function handle(event) {
                      if (event.origin !== window.location.origin) {
                        return;
                      }

                      const hash = JSON.parse(event.data);
                      if (hash.type === "access_token") {
                        window.removeEventListener("message", handle);
                        spotify.mutate(hash.access_token);
                      }
                    },
                    false
                  );
                }}
              />
            </Tooltip>
          )}
        </Flex>
      }
    >
      <SimpleGrid columns={{ base: 2, xl: 1, "2xl": 2 }} mt={3} spacing={5}>
        {artists.map((artist) => (
          <AvatarTag
            description={artist.name}
            key={artist.icon}
            icon={artist.icon}
          />
        ))}
      </SimpleGrid>
    </ProfileCard>
  );
};
export default SpotifyArtists;

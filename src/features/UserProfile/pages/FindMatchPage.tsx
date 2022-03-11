import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import ProfileMatchCard from "../components/ProfileMatchCard";
import BaseAppPage from "../../../Base/pages/BaseAppPage";
import { useMatches, usePendingMatches } from "../api/getMatches";
import { UserProfile } from "../types/Profile";

const FindMatchPage = () => {
  const matchQuery = useMatches();
  const pendingMatches = usePendingMatches();

  return (
    <BaseAppPage>
      <SimpleGrid spacing={2} minChildWidth={"300px"}>
        {pendingMatches.isSuccess &&
          pendingMatches.data.map((user: UserProfile) => (
            <ProfileMatchCard {...user} key={user.id} />
          ))}
        {matchQuery.isSuccess &&
          matchQuery.data.map((user: UserProfile) => (
            <ProfileMatchCard {...user} key={user.id} />
          ))}
      </SimpleGrid>
    </BaseAppPage>
  );
};
export default FindMatchPage;

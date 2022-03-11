import React from "react";
import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ProfileMatchCard from "../components/ProfileMatchCard";
import BaseAppPage from "../../../Base/pages/BaseAppPage";
import { useMatches } from "../api/getMatches";
import { UserProfile } from "../types/Profile";

const FindMatchPage = () => {
  const matchQuery = useMatches();

  return (
    <BaseAppPage>
      <Tabs variant={"soft-rounded"} align={"center"} p={4}>
        <TabList>
          <Tab>Search</Tab>
          <Tab>Matches</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid spacing={2} minChildWidth={"300px"}>
              {matchQuery.isSuccess &&
                matchQuery.data.map((user: UserProfile) => (
                  <ProfileMatchCard {...user} key={user.id} />
                ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BaseAppPage>
  );
};
export default FindMatchPage;

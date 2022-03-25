import React, { useState } from "react";
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
import { useAcceptedMatches, useMatches } from "../api/getMatches";
import { UserProfile } from "../types/Profile";
import DetailedProfile from "../components/DetailedProfile";

const FindMatchPage = () => {
  const { data, isSuccess } = useMatches();
  const acceptedMatches = useAcceptedMatches();
  const [activeProfile, setActiveProfile] = useState(0);

  return (
    <BaseAppPage>
      <Tabs
        variant="soft-rounded"
        isLazy
        align={"center"}
        overflow={"auto"}
        h={"100vh"}
      >
        <TabList pt={5}>
          <Tab>Matches</Tab>
          <Tab>Previous Matches</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {isSuccess && (
              <DetailedProfile
                {...data[activeProfile]}
                nextProfileAction={() =>
                  setActiveProfile((prevState) => prevState + 1)
                }
              />
            )}
          </TabPanel>
          <TabPanel>
            <SimpleGrid spacing={1} minChildWidth={"350px"}>
              {acceptedMatches.isSuccess &&
                acceptedMatches.data.map((user: UserProfile) => (
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

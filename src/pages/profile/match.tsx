import React, { useState } from "react";
import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ProfileMatchCard from "@/features/UserProfile/components/ProfileMatchCard";
import BaseAppLayout from "@/features/Base/BaseAppLayout";
import {
  useAcceptedMatches,
  useMatches,
} from "@/features/UserProfile/api/getMatches";
import { UserProfile } from "@/features/UserProfile/types/Profile";
import DetailedProfile from "@/features/UserProfile/components/DetailedProfile";

const Match = () => {
  const { data, isSuccess } = useMatches();
  const acceptedMatches = useAcceptedMatches();
  const [activeProfile, setActiveProfile] = useState(0);

  return (
    <BaseAppLayout title={"Match"}>
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
    </BaseAppLayout>
  );
};
export default Match;

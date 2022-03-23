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
import { useMatches } from "../api/getMatches";
import { UserProfile } from "../types/Profile";
import DetailedProfile from "../components/DetailedProfile";

const FindMatchPage = () => {
  const { data, isSuccess, isLoading } = useMatches();
  const [activeProfile, setActiveProfile] = useState(0);

  return (
    <BaseAppPage>
      <Tabs variant="soft-rounded" isLazy align={"center"}>
        <TabList pt={5}>
          <Tab>Single View</Tab>
          <Tab>Grid View</Tab>
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
              {isSuccess &&
                data.map((user: UserProfile) => (
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

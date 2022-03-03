import React, { useEffect } from "react";
import BaseAppPage from "../../Base/pages/BaseAppPage";
import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ProfileMatchCard from "../components/ProfileMatchCard";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { getPotentialMatches } from "../userProfileReducer";

const FindMatchPage = () => {
  const dispatch = useAppDispatch();
  const matchProfileIds = useAppSelector((state) => state.profile.users.ids);

  useEffect(() => {
    dispatch(getPotentialMatches());
  }, []);

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
              {matchProfileIds.map((id) => (
                <ProfileMatchCard userId={id} key={id} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BaseAppPage>
  );
};
export default FindMatchPage;

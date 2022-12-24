import { useBreakpointValue } from "@chakra-ui/react";

export const useIsDesktop = () => {
  return useBreakpointValue({ base: false, md: true });
};

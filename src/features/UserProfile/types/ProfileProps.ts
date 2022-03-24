import { UserProfile } from "./Profile";

export interface ProfileProps extends UserProfile {
  editMode: boolean;
  isLoading?: boolean;
}

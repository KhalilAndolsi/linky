import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ProfileInfo = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
};

type ProfileState = {
  info: ProfileInfo;
  updateInfo: (updatedInfo: ProfileInfo) => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      info: {
        firstName: "",
        lastName: "",
        email: "",
        profilePicture: "",
      },
      updateInfo: (updatedInfo: ProfileInfo) => set({ info: updatedInfo }),
    }),
    {
      name: "local-profile-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

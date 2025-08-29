import {create} from "zustand";

type tabName = "links" | "profile"
interface TabsState {
  tabs: tabName[];
  selectedTab: tabName;
  changeTab: (tab: tabName) => void;
}

export const useTabsStore = create<TabsState>((set) => ({
  tabs: ["links", "profile"] as tabName[],
  selectedTab: "links",
  changeTab: (tab: tabName) => set({selectedTab: tab}),
}))
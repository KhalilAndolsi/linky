"use client";
import React from "react";
import LinksSection from "./links-section";
import ProfileSection from "./profile-section";
import { useTabsStore } from "@/context/tabs";

const Sections = () => {
  const { selectedTab, tabs } = useTabsStore();
  return <>{selectedTab === tabs[0] ? <LinksSection /> : <ProfileSection />}</>;
};

export default Sections;

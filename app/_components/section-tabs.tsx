"use client";
import React from "react";
import { Button } from "@heroui/button";
import { Link, UserCircle } from "lucide-react";
import { useTabsStore } from "@/context/tabs";

const SectionTabs = () => {
  const { selectedTab, tabs, changeTab } = useTabsStore();
  return (
    <>
      <Button
        color="primary"
        variant={selectedTab === tabs[0] ? "flat" : "light"}
        size="md"
        className="font-medium !min-w-10 px-3 sm:px-4 sm:min-w-20"
        onPress={() => changeTab(tabs[0])}>
        <Link size={16} />
        <span className="hidden sm:inline-block">Links</span>
      </Button>
      <Button
        color="primary"
        variant={selectedTab === tabs[1] ? "flat" : "light"}
        size="md"
        className="font-medium !min-w-10 px-3 sm:px-4 sm:min-w-20"
        onPress={() => changeTab(tabs[1])}>
        <UserCircle size={16} />
        <span className="hidden sm:inline-block">Profile Details</span>
      </Button>
    </>
  );
};

export default SectionTabs;

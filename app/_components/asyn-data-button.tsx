"use client";
import { LinkProps, useLinksStore } from "@/context/links";
import { useProfileStore } from "@/context/profile";
import { authClient } from "@/lib/auth-client";
import { addToast } from "@heroui/react";
import { Loader, RefreshCw } from "lucide-react";
import React, { useState } from "react";

const AsyncDataButton = () => {
  const [isPending, setIsPending] = useState(false);
  const { updateLinks } = useLinksStore();
  const { updateInfo } = useProfileStore();
  const handleAsyncData = async () => {
    setIsPending(true);
    const { data: session } = await authClient.getSession();
    if (session === null) throw new Error("You are not authorized");
    try {
      const response = await fetch("/api/profile");
      addToast({
        title: "Async Data",
        description: "Please Wait a seconds...",
        color: "secondary",
        variant: "flat",
        loadingComponent: <Loader size={18} className="animate-spin" />,
      });
      const data = await response.json();
      const userProfileDetails = data.data;
      if (userProfileDetails !== null) {
        updateLinks(userProfileDetails.links as LinkProps[]);
        useLinksStore.persist.rehydrate();
        updateInfo({
          email: userProfileDetails.email || "",
          firstName: userProfileDetails.firstName || "",
          lastName: userProfileDetails.lastName || "",
          profilePicture: userProfileDetails.profilePicture?.url || "",
        });
        useProfileStore.persist.rehydrate();
        addToast({
          title: "Async Data",
          description: "Async data is successfully ✅",
          color: "success",
          variant: "flat",
        });
      } else {
        addToast({
          title: "Async Data",
          description: "You don't have any data saved!",
          color: "warning",
          variant: "flat",
        });
      }
    } catch (err) {
      console.log(err);
      addToast({
        title: "Async Data",
        description: "Async data has been error ❌",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <button
      type="button"
      className="flex gap-2 items-center disabled:opacity-50"
      disabled={isPending}
      onClick={handleAsyncData}>
      {isPending ? (
        <>
          <Loader size={14} className="animate-spin" /> Loading Data...
        </>
      ) : (
        <>
          <RefreshCw size={14} />
          Async Data
        </>
      )}
    </button>
  );
};

export default AsyncDataButton;

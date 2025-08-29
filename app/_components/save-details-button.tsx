"use client";
import { useProfileStore } from "@/context/profile";
import { authClient } from "@/lib/auth-client";
import { imageKit } from "@/lib/imagekit";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import React, { useState } from "react";

const SaveDetailsButton = ({ isDisabled }: { isDisabled: boolean }) => {
  const { info, updateInfo } = useProfileStore();
  const [isPending, setIsPending] = useState(false);
  const { data: session } = authClient.useSession();
  const handleApiRequest = async () => {
    setIsPending(true);
    if (!session) {
      return addToast({
        title: "Save button error!",
        description: "You are not authorized to save data please sign in",
        color: "danger",
        variant: "flat",
      });
    }
    try {
      const newInfo: any = {
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
      };
      if (info.profilePicture.startsWith("data:image")) {
        const image = await imageKit.upload({
          file: info.profilePicture,
          fileName: info.firstName + ".jpg",
          folder: "/projects/linky",
        });
        newInfo.profilePicture = {
          url: image.url,
          id: image.fileId,
        };
      }
      const response = await fetch("/api/profile/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfo),
      });
      const { data } = await response.json();
      updateInfo({
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        profilePicture: data.profilePicture.url,
      });
      addToast({
        title: "Update Profile Details",
        description: "update has been successfully ✅",
        color: "success",
        variant: "flat",
      });
    } catch (err) {
      console.error(err);
      addToast({
        title: "Update Profile Details",
        description: "update has been error ❌",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button
      color="primary"
      className="font-medium"
      onPress={handleApiRequest}
      style={isDisabled ? { opacity: 0.5 } : {}}
      isLoading={isPending}
      disabled={isDisabled || isPending || !session}>
      Save
    </Button>
  );
};

export default SaveDetailsButton;

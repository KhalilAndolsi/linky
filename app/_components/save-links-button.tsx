"use client";
import { useLinksStore } from "@/context/links";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import React, { useState } from "react";

const SaveLinksButton = ({ isDisabled }: { isDisabled: boolean }) => {
  const { links } = useLinksStore();
  const [isPending, setIsPending] = useState(false);
  const { data: session } = authClient.useSession();
  const handleApiRequest = async () => {
    setIsPending(true);
    if (!session) {
      return addToast({
        title: "Save button error!",
        description: "You are not authorized to save data please sign in",
        color: "danger",
        variant: "flat"
      })
    }
    try {
      const response = await fetch("/api/profile/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(links),
      });
      addToast({
        title: "Update Links",
        description: "update has been successfully ✅",
        color: "success",
        variant: "flat",
      });
    } catch (err) {
      // console.error(err);
      addToast({
        title: "Update Links",
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

export default SaveLinksButton;

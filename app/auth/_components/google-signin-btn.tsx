"use client";
import React from "react";
import { Button } from "@heroui/button";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { addToast } from "@heroui/toast";

const GoogleSigninBtn = () => {
  const handleSignIn = async () => {
    const response = await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onError: (err) => {
          addToast({
            title: "Sign In with google",
            description:
              err.error.message ||
              "SomeThing want to bee error please send feedback ❌",
            color: "warning",
            variant: "flat",
          });
        },
      }
    );
  };
  return (
    <Button
      color="primary"
      variant="faded"
      fullWidth
      className="font-medium"
      onPress={handleSignIn}>
      <Image
        src="/assets/images/google.svg"
        width={30}
        height={30}
        alt="google-icon"
        className={`size-4`}
      />
      Sign In With Google
    </Button>
  );
};

export default GoogleSigninBtn;
